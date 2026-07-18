// Edge Function: stripe-webhook
// Receives Stripe webhook events and updates the Supabase subscriptions table.
// Events handled: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')!;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Tier limits mapping
const TIER_LIMITS: Record<string, { max_pods: number; monthly_content_days: number }> = {
  free: { max_pods: 0, monthly_content_days: 0 },
  starter: { max_pods: 1, monthly_content_days: 7 },
  growth: { max_pods: 3, monthly_content_days: 15 },
  pro: { max_pods: 10, monthly_content_days: 30 },
  scale: { max_pods: 999, monthly_content_days: 60 },
};

function getTierFromPriceId(priceId: string): string {
  const envMap: Record<string, string | undefined> = {
    [Deno.env.get('STRIPE_PRICE_STARTER') || '']: 'starter',
    [Deno.env.get('STRIPE_PRICE_GROWTH') || '']: 'growth',
    [Deno.env.get('STRIPE_PRICE_PRO') || '']: 'pro',
    [Deno.env.get('STRIPE_PRICE_SCALE') || '']: 'scale',
  };
  return envMap[priceId] || 'starter';
}

function getLimits(tier: string) {
  return TIER_LIMITS[tier] || TIER_LIMITS.starter;
}

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  if (!stripeWebhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  let event: Stripe.Event;

  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, stripeWebhookSecret);
  } catch (err: any) {
    console.error('Stripe signature verification failed:', err.message);
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

  console.log(`Stripe event received: ${event.type} — ${event.id}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const stripeCustomerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
        const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

        if (session.mode !== 'subscription') {
          console.log('Skipping non-subscription checkout session');
          break;
        }

        if (!userId || !stripeCustomerId || !stripeSubscriptionId) {
          console.error('Missing fields in checkout.session.completed', { userId, stripeCustomerId, stripeSubscriptionId });
          return new Response('Missing required fields in session', { status: 400 });
        }

        // Fetch subscription details to get price and period end
        const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceId ? getTierFromPriceId(priceId) : 'starter';
        const limits = getLimits(tier);

        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            tier,
            status: subscription.status === 'active' || subscription.status === 'trialing' ? 'active' : 'inactive',
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
            max_pods: limits.max_pods,
            monthly_content_days: limits.monthly_content_days,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) {
          console.error('Supabase upsert error (checkout):', error);
          return new Response(`Database error: ${error.message}`, { status: 500 });
        }

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeCustomerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
        const stripeSubscriptionId = subscription.id;

        if (!stripeCustomerId || !stripeSubscriptionId) {
          console.error('Missing fields in customer.subscription.updated');
          return new Response('Missing required fields in subscription', { status: 400 });
        }

        // Find existing record by stripe_subscription_id or stripe_customer_id
        const { data: existing } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', stripeSubscriptionId)
          .maybeSingle();

        // If not found by subscription_id, try by customer_id
        let userId = existing?.user_id;
        if (!userId) {
          const { data: byCustomer } = await supabase
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', stripeCustomerId)
            .maybeSingle();
          userId = byCustomer?.user_id;
        }

        if (!userId) {
          // Attempt to create from the subscription metadata if available
          userId = subscription.metadata?.user_id;
          if (!userId) {
            console.error('No user_id mapped for subscription update', { stripeSubscriptionId, stripeCustomerId });
            return new Response('No user mapped for this subscription', { status: 400 });
          }
        }

        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceId ? getTierFromPriceId(priceId) : 'starter';
        const limits = getLimits(tier);

        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: stripeCustomerId,
            stripe_subscription_id: stripeSubscriptionId,
            tier,
            status: subscription.status === 'active' || subscription.status === 'trialing' ? 'active' : 'inactive',
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
            max_pods: limits.max_pods,
            monthly_content_days: limits.monthly_content_days,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) {
          console.error('Supabase upsert error (subscription.updated):', error);
          return new Response(`Database error: ${error.message}`, { status: 500 });
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;

        if (!stripeSubscriptionId) {
          console.error('Missing stripeSubscriptionId in customer.subscription.deleted');
          return new Response('Missing subscription ID', { status: 400 });
        }

        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            tier: 'free',
            max_pods: 0,
            monthly_content_days: 0,
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', stripeSubscriptionId);

        if (error) {
          console.error('Supabase update error (subscription.deleted):', error);
          return new Response(`Database error: ${error.message}`, { status: 500 });
        }

        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
        return new Response('Event type not handled', { status: 200 });
      }
    }

    return new Response(JSON.stringify({ received: true, event: event.type }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return new Response(`Internal error: ${err.message}`, { status: 500 });
  }
});
