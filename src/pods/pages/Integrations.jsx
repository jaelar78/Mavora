/******  INTEGRATIONS — Connect social & third-party services  ******/
import React, { useState } from 'react';
import { Plug, Check, X, Instagram, Youtube, Twitter, Facebook, Linkedin, ShoppingBag, CreditCard, Mail, Globe } from 'lucide-react';

const INTEGRATIONS = [
  { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} />, category: 'Social', status: 'connected', color: '#E1306C' },
  { id: 'tiktok', name: 'TikTok', icon: <Twitter size={20} />, category: 'Social', status: 'disconnected', color: '#00f2ea' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube size={20} />, category: 'Social', status: 'connected', color: '#FF0000' },
  { id: 'twitter', name: 'Twitter / X', icon: <Twitter size={20} />, category: 'Social', status: 'disconnected', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook size={20} />, category: 'Social', status: 'disconnected', color: '#1877F2' },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={20} />, category: 'Social', status: 'disconnected', color: '#0A66C2' },
  { id: 'shopify', name: 'Shopify', icon: <ShoppingBag size={20} />, category: 'E-commerce', status: 'disconnected', color: '#96BF48' },
  { id: 'stripe', name: 'Stripe', icon: <CreditCard size={20} />, category: 'Payments', status: 'connected', color: '#635BFF' },
  { id: 'sendgrid', name: 'SendGrid', icon: <Mail size={20} />, category: 'Email', status: 'disconnected', color: '#1A82E2' },
  { id: 'google', name: 'Google Analytics', icon: <Globe size={20} />, category: 'Analytics', status: 'disconnected', color: '#E37400' },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const toggleStatus = (id) => {
    setIntegrations((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected' } : i));
  };

  const categories = [...new Set(integrations.map((i) => i.category))];

  return (
    <div className="pod-page-container space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Integrations</h2>
        <p className="text-sm text-gray-400">Connect your social accounts and third-party services</p>
      </div>

      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-2">
            {integrations.filter((i) => i.category === cat).map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-3 bg-[#111118] border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div style={{ color: integration.color }}>{integration.icon}</div>
                  <div>
                    <p className="text-sm text-white font-medium">{integration.name}</p>
                    <p className="text-xs text-gray-500">{integration.status}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStatus(integration.id)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    integration.status === 'connected'
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}