/******  SERVICES INDEX  ******/
export { default as supabaseService } from './supabase';
export { default as stripeService } from './stripe';
export { default as openaiService } from './openai';
export { default as sendgridService } from './sendgrid';
export { default as metaAdsService } from './meta-ads';

// Service factory for dependency injection
export function createServices(config = {}) {
  return {
    supabase: supabaseService,
    stripe: stripeService,
    openai: openaiService,
    sendgrid: sendgridService,
    metaAds: metaAdsService,
  };
}