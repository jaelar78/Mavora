import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

let stripePromise = null;

export function isStripeConfigured() {
  return Boolean(stripePublishableKey);
}

export function getStripe() {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
}

// ── Checkout ──────────────────────────────────────────────────────────────────

/**
 * Redirects to Stripe Checkout for subscription.
 * Requires a Supabase Edge Function to create the Checkout Session.
 */
export async function redirectToCheckout({ priceId, customerEmail, successUrl, cancelUrl }) {
  const stripe = await getStripe();
  if (!stripe) throw new Error('Stripe not configured');

  // Call your Supabase Edge Function to create a Checkout Session
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price_id: priceId, customer_email: customerEmail, success_url: successUrl, cancel_url: cancelUrl }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create checkout session');
  }

  const { sessionId } = await response.json();
  const result = await stripe.redirectToCheckout({ sessionId });
  if (result.error) throw new Error(result.error.message);
}

// ── Customer Portal ───────────────────────────────────────────────────────────

export async function redirectToCustomerPortal({ returnUrl }) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-portal-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ return_url: returnUrl }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to create portal session');
  }

  const { url } = await response.json();
  window.location.href = url;
}

// ── Subscription helpers ──────────────────────────────────────────────────────

export async function fetchSubscription(userId) {
  const supabase = (await import('./supabase')).supabase;
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
