/******  NEW POD — Create a New Pod with AI Onboarding  ******/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Palette, Target, Hash, Globe, Image,
  Type, Users, Zap, Loader2, Wand2
} from 'lucide-react';
import { usePod } from '../pods/PodContext';

const STEPS = [
  { id: 'name', label: 'Name', icon: Type },
  { id: 'type', label: 'Type', icon: Palette },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'platforms', label: 'Platforms', icon: Globe },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'review', label: 'Review', icon: Check },
];

const POD_TYPES = ['Fashion', 'Fitness', 'Art', 'Tech', 'Food', 'Travel', 'Lifestyle', 'Business', 'Music', 'Photography', 'Gaming', 'Beauty', 'Education', 'Other'];

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: 'from-purple-600 to-pink-500' },
  { id: 'tiktok', label: 'TikTok', color: 'from-gray-800 to-black' },
  { id: 'youtube', label: 'YouTube', color: 'from-red-600 to-red-500' },
  { id: 'twitter', label: 'Twitter / X', color: 'from-blue-500 to-blue-400' },
  { id: 'facebook', label: 'Facebook', color: 'from-blue-700 to-blue-600' },
  { id: 'linkedin', label: 'LinkedIn', color: 'from-blue-800 to-blue-700' },
  { id: 'pinterest', label: 'Pinterest', color: 'from-red-700 to-red-600' },
  { id: 'threads', label: 'Threads', color: 'from-gray-700 to-gray-600' },
];

const GOALS = [
  { id: 'brand_awareness', label: 'Brand Awareness', desc: 'Grow your reach and visibility' },
  { id: 'engagement', label: 'Engagement', desc: 'Build a loyal community' },
  { id: 'sales', label: 'Drive Sales', desc: 'Convert followers to customers' },
  { id: 'leads', label: 'Generate Leads', desc: 'Collect emails and inquiries' },
  { id: 'authority', label: 'Thought Leadership', desc: 'Establish expertise' },
  { id: 'traffic', label: 'Website Traffic', desc: 'Drive visitors to your site' },
];

export default function NewPod() {
  const navigate = useNavigate();
  const { createPod } = usePod();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'Fashion',
    bio: '',
    website: '',
    audience: { age: '18-34', gender: 'all', interests: [] },
    platforms: ['instagram'],
    goals: ['brand_awareness'],
  });

  const currentStep = STEPS[step];
  const StepIcon = currentStep.icon;

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleCreate = async () => {
    setGenerating(true);
    try {
      const newPod = await createPod({
        name: form.name,
        type: form.type,
        bio: form.bio,
        website: form.website,
        platforms: form.platforms.map((p) => PLATFORMS.find((pl) => pl.id === p)?.label || p),
        goals: form.goals,
      });
      navigate(`/pods/${newPod.id}`);
    } catch (error) {
      console.error('Error creating pod:', error);
    } finally {
      setGenerating(false);
    }
  };

  const canProceed = () => {
    if (step === 0) return form.name.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Progress Header */}
      <div className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur border-b border-gray-800/60 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => step === 0 ? navigate('/pods') : prevStep()} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft size={16} /> {step === 0 ? 'Back' : 'Previous'}
            </button>
            <span className="text-xs text-gray-500">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex-1 flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full transition-all ${i <= step ? 'bg-purple-500' : 'bg-gray-800'}`} />
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 transition-all ${i < step ? 'bg-purple-500' : 'bg-gray-800'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
              <StepIcon size={20} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{currentStep.label}</h2>
              <p className="text-sm text-gray-400">
                {step === 0 && 'What should we call your pod?'}
                {step === 1 && 'Choose your pod category'}
                {step === 2 && 'Tell us about your audience'}
                {step === 3 && 'Where will you publish?'}
                {step === 4 && 'What are your main goals?'}
                {step === 5 && 'Review and create your pod'}
              </p>
            </div>
          </div>

          {/* Step Content */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Pod Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g., Fashion Forward"
                  className="w-full input-field"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Short Bio (optional)</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Describe your pod in a few words..."
                  rows={2}
                  className="w-full input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Website (optional)</label>
                <input
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="https://..."
                  className="w-full input-field"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {POD_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((f) => ({ ...f, type }))}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    form.type === type
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-[#111118] hover:border-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium text-white">{type}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Primary Age Range</label>
                <select
                  value={form.audience.age}
                  onChange={(e) => setForm((f) => ({ ...f, audience: { ...f.audience, age: e.target.value } }))}
                  className="w-full input-field"
                >
                  <option>13-17</option>
                  <option>18-24</option>
                  <option>18-34</option>
                  <option>25-44</option>
                  <option>35-54</option>
                  <option>55+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Target Gender</label>
                <div className="flex gap-2">
                  {['all', 'female', 'male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm((f) => ({ ...f, audience: { ...f.audience, gender: g } }))}
                      className={`flex-1 py-2 text-sm rounded-lg border transition-all capitalize ${
                        form.audience.gender === g
                          ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                          : 'border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setForm((f) => ({
                      ...f,
                      platforms: f.platforms.includes(platform.id)
                        ? f.platforms.filter((p) => p !== platform.id)
                        : [...f.platforms, platform.id],
                    }));
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    form.platforms.includes(platform.id)
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-[#111118] hover:border-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">{platform.label[0]}</span>
                  </div>
                  <span className="text-sm text-white flex-1 text-left">{platform.label}</span>
                  {form.platforms.includes(platform.id) && <Check size={16} className="text-purple-400" />}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => {
                    setForm((f) => ({
                      ...f,
                      goals: f.goals.includes(goal.id)
                        ? f.goals.filter((g) => g !== goal.id)
                        : [...f.goals, goal.id],
                    }));
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    form.goals.includes(goal.id)
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-[#111118] hover:border-gray-700'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{goal.label}</p>
                    <p className="text-xs text-gray-500">{goal.desc}</p>
                  </div>
                  {form.goals.includes(goal.id) && <Check size={16} className="text-purple-400 ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="pod-card space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {form.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{form.name || 'Untitled Pod'}</h3>
                    <p className="text-sm text-gray-400">{form.type}</p>
                  </div>
                </div>
                {form.bio && <p className="text-sm text-gray-300">{form.bio}</p>}
                <div className="flex flex-wrap gap-2">
                  {form.platforms.map((p) => (
                    <span key={p} className="pod-badge-purple">{PLATFORMS.find((pl) => pl.id === p)?.label || p}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.goals.map((g) => (
                    <span key={g} className="pod-badge bg-gray-800 text-gray-400">{GOALS.find((gl) => gl.id === g)?.label || g}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-start gap-3">
                <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Your pod will be created with AI-powered tools ready to go. You'll have access to content generation, analytics, calendar planning, and more.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            {step > 0 && (
              <button onClick={prevStep} className="btn-secondary">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={nextStep} disabled={!canProceed()} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleCreate} disabled={generating} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {generating ? 'Creating...' : 'Create Pod'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}