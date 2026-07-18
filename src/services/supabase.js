/******  SUPABASE SERVICE — Database & auth operations  ******/

import { supabase } from '../lib/supabaseClient';

const supabaseService = {
  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  /**
   * Get user profile
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Update user profile
   */
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId')
      .select();
    if (error) throw error;
    return data;
  },

  /**
   * Get pods for user
   */
  async getPods(userId) {
    const { data, error } = await supabase
      .from('pods')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /**
   * Create a pod
   */
  async createPod(podData) {
    const { data, error } = await supabase
      .from('pods')
      .insert(podData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Update a pod
   */
  async updatePod(podId, updates) {
    const { data, error } = await supabase
      .from('pods')
      .update(updates)
      .eq('id', podId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Delete a pod
   */
  async deletePod(podId) {
    const { error } = await supabase
      .from('pods')
      .delete()
      .eq('id', podId);
    if (error) throw error;
  },

  /**
   * Get analytics for pod
   */
  async getPodAnalytics(podId, range = '7d') {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('pod_id', podId)
      .gte('date', getDateRange(range))
      .order('date', { ascending: true });
    if (error) throw error;
    return data;
  },

  /**
   * Get content for pod
   */
  async getPodContent(podId) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('pod_id', podId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  /**
   * Save content
   */
  async saveContent(contentData) {
    const { data, error } = await supabase
      .from('content')
      .insert(contentData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Get scheduled posts
   */
  async getScheduledPosts(podId) {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('pod_id', podId)
      .gte('scheduled_date', new Date().toISOString())
      .order('scheduled_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  /**
   * Real-time subscriptions
   */
  subscribeToPod(podId, callback) {
    return supabase
      .channel(`pod_${podId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pods', filter: `id=eq.${podId}` }, callback)
      .subscribe();
  },
};

function getDateRange(range) {
  const now = new Date();
  const days = { '7d': 7, '30d': 30, '90d': 90 };
  now.setDate(now.getDate() - (days[range] || 7));
  return now.toISOString();
}

export default supabaseService;