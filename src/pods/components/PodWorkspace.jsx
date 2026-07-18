/******  POD WORKSPACE — Main content area for pod pages  ******/
import React from 'react';

export default function PodWorkspace({ children }) {
  return (
    <main className="flex-1 overflow-auto bg-[#0a0a0f]">
      <div className="min-h-full">
        {children}
      </div>
    </main>
  );
}