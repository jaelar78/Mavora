/******  POD CONTEXT — Global pod state management  ******/
import React, { createContext, useContext, useState, useCallback } from 'react';

// ─── DEMO PODS ───
const DEMO_PODS = [
  {
    id: 'fashion-forward',
    name: 'Fashion Forward',
    type: 'Fashion',
    bio: 'Daily fashion inspiration, styling tips, and trend forecasts for the modern wardrobe.',
    website: 'https://fashionforward.style',
    platforms: ['Instagram', 'TikTok', 'Pinterest'],
    status: 'Active',
    goals: ['brand_awareness', 'engagement'],
    createdAt: '2026-01-01',
    avatar: null,
    settings: {
      postingFrequency: 'daily',
      bestTimes: { Instagram: '11:00 AM - 1:00 PM', TikTok: '7:00 PM - 9:00 PM', Pinterest: '8:00 PM - 11:00 PM' },
      tone: 'Casual',
      autoSchedule: true,
    },
    analytics: {
      followers: 28470,
      following: 342,
      posts: 156,
      engagement: 6.8,
      reach: 125000,
      impressions: 340000,
      profileViews: 8900,
      websiteClicks: 2340,
    },
    audience: {
      topLocations: ['United States', 'United Kingdom', 'Canada', 'Australia', 'France'],
      ageGroups: { '18-24': 35, '25-34': 40, '35-44': 18, '45-54': 5, '55+': 2 },
      gender: { female: 68, male: 29, other: 3 },
      activeHours: [12, 13, 19, 20, 21],
    },
    contentIdeas: [
      { id: 1, title: 'Spring Color Palette Trends', type: 'carousel', status: 'draft', date: '2026-01-20' },
      { id: 2, title: '5 Ways to Style a White Tee', type: 'reel', status: 'scheduled', date: '2026-01-22' },
      { id: 3, title: 'Capsule Wardrobe Essentials', type: 'carousel', status: 'published', date: '2026-01-18' },
      { id: 4, title: 'Sustainable Fashion Brands', type: 'story', status: 'draft', date: '2026-01-25' },
    ],
    scheduledPosts: [
      { id: 1, title: 'OOTD: Monday Blues', platform: 'Instagram', date: '2026-01-20', time: '12:00 PM', status: 'scheduled' },
      { id: 2, title: 'Trend Alert: Fringe', platform: 'TikTok', date: '2026-01-21', time: '7:30 PM', status: 'scheduled' },
    ],
  },
  {
    id: 'fitness-daily',
    name: 'Fitness Daily',
    type: 'Fitness',
    bio: 'Workout routines, nutrition tips, and motivation for a healthier lifestyle.',
    website: 'https://fitnessdaily.co',
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    status: 'Active',
    goals: ['engagement', 'sales'],
    createdAt: '2026-01-05',
    avatar: null,
    settings: {
      postingFrequency: 'daily',
      bestTimes: { Instagram: '6:00 AM - 8:00 AM', YouTube: '2:00 PM - 4:00 PM', TikTok: '7:00 PM - 9:00 PM' },
      tone: 'Motivational',
      autoSchedule: true,
    },
    analytics: {
      followers: 15230,
      following: 180,
      posts: 89,
      engagement: 8.2,
      reach: 78000,
      impressions: 210000,
      profileViews: 5600,
      websiteClicks: 1890,
    },
    audience: {
      topLocations: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'],
      ageGroups: { '18-24': 25, '25-34': 45, '35-44': 22, '45-54': 6, '55+': 2 },
      gender: { female: 52, male: 45, other: 3 },
      activeHours: [6, 7, 12, 18, 19],
    },
    contentIdeas: [
      { id: 1, title: '10-Minute Morning Yoga Flow', type: 'reel', status: 'scheduled', date: '2026-01-20' },
      { id: 2, title: 'Protein Smoothie Recipes', type: 'carousel', status: 'draft', date: '2026-01-22' },
      { id: 3, title: 'Home Gym Setup Guide', type: 'carousel', status: 'published', date: '2026-01-15' },
    ],
    scheduledPosts: [
      { id: 1, title: 'Workout Wednesday: Core Blast', platform: 'Instagram', date: '2026-01-22', time: '7:00 AM', status: 'scheduled' },
    ],
  },
  {
    id: 'art-studio',
    name: 'Art Studio',
    type: 'Art',
    bio: 'Digital art tutorials, creative process insights, and inspiration for artists.',
    website: 'https://artstudio.design',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    status: 'Active',
    goals: ['brand_awareness', 'authority'],
    createdAt: '2026-01-08',
    avatar: null,
    settings: {
      postingFrequency: '3x_week',
      bestTimes: { Instagram: '2:00 PM - 4:00 PM', TikTok: '8:00 PM - 10:00 PM', YouTube: '12:00 PM - 2:00 PM' },
      tone: 'Inspirational',
      autoSchedule: false,
    },
    analytics: {
      followers: 8920,
      following: 210,
      posts: 45,
      engagement: 5.4,
      reach: 42000,
      impressions: 115000,
      profileViews: 3200,
      websiteClicks: 980,
    },
    audience: {
      topLocations: ['United States', 'United Kingdom', 'Canada', 'Japan', 'France'],
      ageGroups: { '18-24': 40, '25-34': 35, '35-44': 18, '45-54': 5, '55+': 2 },
      gender: { female: 58, male: 38, other: 4 },
      activeHours: [14, 15, 20, 21, 22],
    },
    contentIdeas: [
      { id: 1, title: 'Color Theory Basics', type: 'carousel', status: 'draft', date: '2026-01-21' },
      { id: 2, title: 'Speed Paint: Landscape', type: 'reel', status: 'scheduled', date: '2026-01-23' },
    ],
    scheduledPosts: [],
  },
];

// ─── CONTEXT ───
const PodContext = createContext(null);

export function PodProvider({ children }) {
  const [pods, setPods] = useState(DEMO_PODS);
  const [currentPodId, setCurrentPodId] = useState(null);

  const currentPod = pods.find((p) => p.id === currentPodId) || null;

  const createPod = useCallback((data) => {
    const newPod = {
      id: `pod-${Date.now()}`,
      name: data.name,
      type: data.type || 'Other',
      bio: data.bio || '',
      website: data.website || '',
      platforms: data.platforms || ['Instagram'],
      status: 'Active',
      goals: data.goals || ['brand_awareness'],
      createdAt: new Date().toISOString().split('T')[0],
      avatar: null,
      settings: {
        postingFrequency: 'daily',
        bestTimes: {},
        tone: 'Casual',
        autoSchedule: true,
      },
      analytics: {
        followers: 0, following: 0, posts: 0, engagement: 0,
        reach: 0, impressions: 0, profileViews: 0, websiteClicks: 0,
      },
      audience: {
        topLocations: [],
        ageGroups: { '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55+': 0 },
        gender: { female: 0, male: 0, other: 0 },
        activeHours: [],
      },
      contentIdeas: [],
      scheduledPosts: [],
    };
    setPods((prev) => [...prev, newPod]);
    return newPod;
  }, []);

  const updatePod = useCallback((podId, updates) => {
    setPods((prev) => prev.map((p) => (p.id === podId ? { ...p, ...updates } : p)));
  }, []);

  const deletePod = useCallback((podId) => {
    setPods((prev) => prev.filter((p) => p.id !== podId));
  }, []);

  const switchPod = useCallback((podId) => {
    setCurrentPodId(podId);
  }, []);

  const addContentIdea = useCallback((podId, idea) => {
    setPods((prev) => prev.map((p) => {
      if (p.id !== podId) return p;
      return { ...p, contentIdeas: [...p.contentIdeas, { id: Date.now(), ...idea }] };
    }));
  }, []);

  const schedulePost = useCallback((podId, post) => {
    setPods((prev) => prev.map((p) => {
      if (p.id !== podId) return p;
      return { ...p, scheduledPosts: [...p.scheduledPosts, { id: Date.now(), ...post }] };
    }));
  }, []);

  const updateAnalytics = useCallback((podId, metrics) => {
    setPods((prev) => prev.map((p) => {
      if (p.id !== podId) return p;
      return { ...p, analytics: { ...p.analytics, ...metrics } };
    }));
  }, []);

  const value = {
    pods,
    currentPod,
    currentPodId,
    createPod,
    updatePod,
    deletePod,
    switchPod,
    addContentIdea,
    schedulePost,
    updateAnalytics,
  };

  return <PodContext.Provider value={value}>{children}</PodContext.Provider>;
}

export function usePod() {
  const ctx = useContext(PodContext);
  if (!ctx) throw new Error('usePod must be used within PodProvider');
  return ctx;
}