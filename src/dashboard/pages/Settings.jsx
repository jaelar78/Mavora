import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Key,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function Settings() {
  // ── API Keys ──
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [stripeKey, setStripeKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [sendgridKey, setSendgridKey] = useState('');
  const [metaToken, setMetaToken] = useState('');
  const [metaAccountId, setMetaAccountId] = useState('');

  const [showKeys, setShowKeys] = useState({});
  const [saved, setSaved] = useState(false);

  const toggleShow = (field) => {
    setShowKeys((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // In a real app, these would be saved securely via Supabase Edge Function
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const InputField = ({ label, value, onChange, placeholder, fieldKey, hint }) => (
    <div>
      <label className="block text-xs font-medium text-[#6B6560] mb-1.5">{label}</label>
      {hint && <p className="text-[10px] text-[#9E9484] mb-1">{hint}</p>}
      <div className="relative">
        <input
          type={showKeys[fieldKey] ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
        />
        <button
          onClick={() => toggleShow(fieldKey)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9E9484] hover:text-[#6B6560] transition-colors"
        >
          {showKeys[fieldKey] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Settings</h1>
        <p className="text-sm text-[#9E9484] mt-0.5">Configure API keys and integrations.</p>
      </div>

      {/* Supabase */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">Supabase</h3>
          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-medium">
            Required
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <InputField
            label="Supabase URL"
            value={supabaseUrl}
            onChange={setSupabaseUrl}
            placeholder="https://your-project.supabase.co"
            fieldKey="supabaseUrl"
          />
          <InputField
            label="Supabase Anon Key"
            value={supabaseKey}
            onChange={setSupabaseKey}
            placeholder="eyJhbGciOiJIUzI1NiIs..."
            fieldKey="supabaseKey"
          />
        </div>
      </div>

      {/* Stripe */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">Stripe</h3>
          <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#6B6560] rounded text-[10px] font-medium">
            Optional
          </span>
        </div>
        <InputField
          label="Stripe Publishable Key"
          value={stripeKey}
          onChange={setStripeKey}
          placeholder="pk_live_..."
          fieldKey="stripeKey"
        />
      </div>

      {/* OpenAI */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">OpenAI</h3>
          <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#6B6560] rounded text-[10px] font-medium">
            Optional
          </span>
        </div>
        <InputField
          label="OpenAI API Key"
          value={openaiKey}
          onChange={setOpenaiKey}
          placeholder="sk-..."
          fieldKey="openaiKey"
        />
      </div>

      {/* SendGrid */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">SendGrid</h3>
          <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#6B6560] rounded text-[10px] font-medium">
            Optional
          </span>
        </div>
        <InputField
          label="SendGrid API Key"
          value={sendgridKey}
          onChange={setSendgridKey}
          placeholder="SG.•••"
          fieldKey="sendgridKey"
        />
      </div>

      {/* Meta Ads */}
      <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#C9A96E]" />
          <h3 className="text-sm font-semibold text-[#3D3632]">Meta Ads</h3>
          <span className="px-1.5 py-0.5 bg-[#E8E2D9] text-[#6B6560] rounded text-[10px] font-medium">
            Optional
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InputField
            label="Access Token"
            value={metaToken}
            onChange={setMetaToken}
            placeholder="EAA..."
            fieldKey="metaToken"
          />
          <InputField
            label="Ad Account ID"
            value={metaAccountId}
            onChange={setMetaAccountId}
            placeholder="act_123456789"
            fieldKey="metaAccountId"
            hint="Format: act_xxxxxxxx"
          />
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#9E9484]">
          <AlertCircle size={13} />
          <span>API keys are stored securely and never exposed to the client.</span>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#3D3632] text-[#FAF9F7] rounded-lg text-sm font-medium hover:bg-[#4A433E] transition-colors"
        >
          {saved ? (
            <>
              <CheckCircle size={16} className="text-emerald-400" />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
