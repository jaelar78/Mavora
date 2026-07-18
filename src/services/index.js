// ── Dovroyn unified API service layer ──
// Each integration can be imported individually or via this barrel file.

export * from './supabase';
export * from './stripe';
export * from './openai';
export * from './sendgrid';
export * from './meta-ads';

// ── Convenience: check all integration health at once ──
import { isSupabaseConfigured } from './supabase';
import { isStripeConfigured } from './stripe';
import { isOpenAIConfigured } from './openai';
import { isSendGridConfigured } from './sendgrid';
import { isMetaAdsConfigured } from './meta-ads';

export function getIntegrationStatus() {
  return {
    supabase: isSupabaseConfigured(),
    stripe: isStripeConfigured(),
    openai: isOpenAIConfigured(),
    sendgrid: isSendGridConfigured(),
    metaAds: isMetaAdsConfigured(),
  };
}

export function getConnectedCount() {
  return Object.values(getIntegrationStatus()).filter(Boolean).length;
}
