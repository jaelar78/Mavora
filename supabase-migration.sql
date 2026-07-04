-- Dovroyn Supabase Database Migration
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'growth', 'pro', 'scale')),
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  current_period_end TIMESTAMPTZ,
  max_pods INTEGER NOT NULL DEFAULT 0,
  monthly_content_days INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_sub_idx ON subscriptions(stripe_subscription_id);

-- Pods table
CREATE TABLE IF NOT EXISTS pods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pod_name TEXT NOT NULL,
  brand_name TEXT,
  pod_type TEXT NOT NULL DEFAULT 'website' CHECK (pod_type IN ('website', 'app', 'product', 'campaign', 'images', 'teaser', 'brand')),
  source_type TEXT,
  source_url TEXT,
  target_country TEXT DEFAULT 'Australia',
  accepted_tone TEXT,
  accepted_strategy TEXT,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'analysing', 'awaiting_direction', 'direction_locked', 'active', 'paused', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pods_user_id_idx ON pods(user_id);

-- Pod sources table
CREATE TABLE IF NOT EXISTS pod_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  source_url TEXT,
  uploaded_file_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pod_sources_pod_id_idx ON pod_sources(pod_id);

-- Pod analysis table
CREATE TABLE IF NOT EXISTS pod_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
  brand_summary TEXT,
  tone TEXT,
  audience TEXT,
  offer_direction TEXT,
  campaign_angles TEXT,
  content_ideas TEXT,
  ad_angles TEXT,
  social_recommendations TEXT,
  calendar_strategy TEXT,
  budget_strategy TEXT,
  next_actions TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS pod_analysis_pod_id_idx ON pod_analysis(pod_id);

-- Calendar items table
CREATE TABLE IF NOT EXISTS calendar_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  content_type TEXT NOT NULL,
  caption TEXT,
  creative_note TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'scheduled', 'posted', 'failed')),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS calendar_items_pod_id_idx ON calendar_items(pod_id);
CREATE INDEX IF NOT EXISTS calendar_items_date_idx ON calendar_items(scheduled_date);

-- Budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
  planned_budget NUMERIC(10,2) DEFAULT 0,
  spend_used NUMERIC(10,2) DEFAULT 0,
  leads INTEGER DEFAULT 0,
  sales INTEGER DEFAULT 0,
  revenue NUMERIC(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS budgets_pod_id_idx ON budgets(pod_id);

-- Ad analysis table
CREATE TABLE IF NOT EXISTS ad_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pod_id UUID REFERENCES pods(id) ON DELETE CASCADE,
  performance_summary TEXT,
  competitor_notes TEXT,
  recommendation TEXT,
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ad_analysis_pod_id_idx ON ad_analysis(pod_id);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  workspace_name TEXT DEFAULT 'Dovroyn Pod Command Centre',
  theme TEXT DEFAULT 'Editorial Ivory and Navy',
  timezone TEXT DEFAULT 'UTC',
  email_notifications BOOLEAN DEFAULT true,
  weekly_digest BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pods ENABLE ROW LEVEL SECURITY;
ALTER TABLE pod_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE pod_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Waitlist: anyone can insert
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);

-- Subscriptions: users can read their own
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Pods: users can CRUD their own
CREATE POLICY "Users can view own pods" ON pods FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create pods" ON pods FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pods" ON pods FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own pods" ON pods FOR DELETE USING (auth.uid() = user_id);

-- Pod sources: users can CRUD via pod ownership
CREATE POLICY "Users can view own pod sources" ON pod_sources FOR SELECT USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_sources.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can create pod sources" ON pod_sources FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_sources.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can update own pod sources" ON pod_sources FOR UPDATE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_sources.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can delete own pod sources" ON pod_sources FOR DELETE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_sources.pod_id AND pods.user_id = auth.uid()));

-- Pod analysis: same pattern
CREATE POLICY "Users can view own pod analysis" ON pod_analysis FOR SELECT USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_analysis.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can create pod analysis" ON pod_analysis FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_analysis.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can update own pod analysis" ON pod_analysis FOR UPDATE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = pod_analysis.pod_id AND pods.user_id = auth.uid()));

-- Calendar items: same pattern
CREATE POLICY "Users can view own calendar items" ON calendar_items FOR SELECT USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = calendar_items.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can create calendar items" ON calendar_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pods WHERE pods.id = calendar_items.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can update own calendar items" ON calendar_items FOR UPDATE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = calendar_items.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can delete own calendar items" ON calendar_items FOR DELETE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = calendar_items.pod_id AND pods.user_id = auth.uid()));

-- Budgets: same pattern
CREATE POLICY "Users can view own budgets" ON budgets FOR SELECT USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = budgets.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can create budgets" ON budgets FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pods WHERE pods.id = budgets.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can update own budgets" ON budgets FOR UPDATE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = budgets.pod_id AND pods.user_id = auth.uid()));

-- Ad analysis: same pattern
CREATE POLICY "Users can view own ad analysis" ON ad_analysis FOR SELECT USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = ad_analysis.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can create ad analysis" ON ad_analysis FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM pods WHERE pods.id = ad_analysis.pod_id AND pods.user_id = auth.uid()));
CREATE POLICY "Users can update own ad analysis" ON ad_analysis FOR UPDATE USING (EXISTS (SELECT 1 FROM pods WHERE pods.id = ad_analysis.pod_id AND pods.user_id = auth.uid()));

-- User settings: users can CRUD their own
CREATE POLICY "Users can view own settings" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

-- Additive columns for existing deployments (safe to run on already-created databases)
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE pods    ADD COLUMN IF NOT EXISTS brand_name TEXT;
