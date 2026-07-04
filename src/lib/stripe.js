// Stripe checkout helper
// Redirects user to Stripe Checkout for subscription

const STRIPE_PRICING_LINKS = {
  starter_monthly: import.meta.env.VITE_STRIPE_STARTER_MONTHLY || null,
  starter_yearly: import.meta.env.VITE_STRIPE_STARTER_YEARLY || null,
  growth_monthly: import.meta.env.VITE_STRIPE_GROWTH_MONTHLY || null,
  growth_yearly: import.meta.env.VITE_STRIPE_GROWTH_YEARLY || null,
  pro_monthly: import.meta.env.VITE_STRIPE_PRO_MONTHLY || null,
  pro_yearly: import.meta.env.VITE_STRIPE_PRO_YEARLY || null,
  scale_monthly: import.meta.env.VITE_STRIPE_SCALE_MONTHLY || null,
  scale_yearly: import.meta.env.VITE_STRIPE_SCALE_YEARLY || null,
};

export function getCheckoutUrl(tierKey, billing = 'monthly') {
  const key = `${tierKey}_${billing}`;
  return STRIPE_PRICING_LINKS[key] || null;
}

export function redirectToCheckout(tierKey, billing = 'monthly') {
  const url = getCheckoutUrl(tierKey, billing);
  if (url) {
    window.location.href = url;
  } else {
    // Fallback to waitlist if Stripe not configured
    window.location.href = '/#waitlist';
  }
}

// Tier limits for subscription gating
// weeklyPostingDays = campaign posting days allowed per week (not per platform)
export const TIER_LIMITS = {
  free:    { maxPods: 0,  monthlyContentDays: 0,  weeklyPostingDays: 0 },
  starter: { maxPods: 1,  monthlyContentDays: 10, weeklyPostingDays: 2 },
  growth:  { maxPods: 3,  monthlyContentDays: 20, weeklyPostingDays: 3 },
  pro:     { maxPods: 7,  monthlyContentDays: 30, weeklyPostingDays: 6 },
  scale:   { maxPods: 12, monthlyContentDays: 30, weeklyPostingDays: 7 },
};

export function canCreatePod(tier, currentPodCount) {
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  return currentPodCount < limits.maxPods;
}

export function getContentDays(tier) {
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  return limits.monthlyContentDays;
}
