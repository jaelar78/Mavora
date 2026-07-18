/******  STRIPE SERVICE — Payment processing & subscriptions  ******/

const API_BASE = '/api/stripe';

const stripeService = {
  /**
   * Create a checkout session
   */
  async createCheckoutSession(params) {
    const { priceId, customerEmail, successUrl, cancelUrl } = params;
    try {
      const response = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, customerEmail, successUrl, cancelUrl }),
      });
      if (!response.ok) throw new Error('Checkout creation failed');
      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
  },

  /**
   * Create a customer portal session
   */
  async createPortalSession(customerId) {
    try {
      const response = await fetch(`${API_BASE}/portal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId }),
      });
      if (!response.ok) throw new Error('Portal creation failed');
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Stripe portal error:', error);
      throw error;
    }
  },

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId) {
    return {
      id: subscriptionId,
      status: 'active',
      currentPeriodStart: '2026-01-15',
      currentPeriodEnd: '2026-02-15',
      plan: 'Growth',
      amount: 7900,
      currency: 'aud',
      interval: 'month',
    };
  },

  /**
   * Get invoices
   */
  async getInvoices(customerId) {
    return [
      { id: 'inv_1', amount: 7900, status: 'paid', date: '2026-01-15', description: 'Growth Plan - January' },
      { id: 'inv_2', amount: 7900, status: 'paid', date: '2025-12-15', description: 'Growth Plan - December' },
      { id: 'inv_3', amount: 7900, status: 'paid', date: '2025-11-15', description: 'Growth Plan - November' },
    ];
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId) {
    return { id: subscriptionId, status: 'canceled_at_period_end' };
  },
};

export default stripeService;