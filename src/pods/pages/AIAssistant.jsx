/******  AI ASSISTANT PAGE — Pod-specific AI chat  ******/
import React from 'react';
import AiPodAssistant from '../../components/AiPodAssistant';

export default function AIAssistant() {
  return (
    <div className="pod-page-container">
      <h2 className="text-xl font-bold text-white mb-4">AI Assistant</h2>
      <p className="text-sm text-gray-400 mb-6">Ask questions about your pod's strategy, content, and growth.</p>
      <div className="max-w-2xl mx-auto">
        <div className="pod-card h-[500px] flex items-center justify-center">
          <AiPodAssistant />
          <p className="text-gray-500 text-sm">AI chat interface loads here</p>
        </div>
      </div>
    </div>
  );
}