/******  STRIPE CLIENT  ******/
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

let stripePromise;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

export async function createCheckoutSession(priceId, customerEmail) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, customerEmail }),
    });
    const { sessionId } = await response.json();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

export async function createPortalSession(customerId) {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId }),
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Portal error:', error);
    throw error;
  }
}

export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Perfect for creators just getting started',
    features: ['1 Pod', '50 AI credits/mo', 'Basic analytics', 'Content calendar', 'Email support'],
    priceId: 'price_starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 79,
    description: 'For serious creators ready to scale',
    features: ['3 Pods', '200 AI credits/mo', 'Advanced analytics', 'AI assistant', 'Collaboration tools', 'Priority support'],
    priceId: 'price_growth',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 199,
    description: 'For teams and agencies',
    features: ['Unlimited Pods', 'Unlimited AI credits', 'Team collaboration', 'API access', 'White-label', 'Dedicated account manager'],
    priceId: 'price_pro',
  },
];

export function getTierById(id) {
  return PRICING_TIERS.find((t) => t.id === id);
}

export function getTierByPriceId(priceId) {
  return PRICING_TIERS.find((t) => t.priceId === priceId);
}