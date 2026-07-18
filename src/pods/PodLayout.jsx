/******  POD LAYOUT — Sidebar + Workspace Shell  ******/
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { usePod } from './PodContext';
import PodSidebar from './components/PodSidebar';
import PodWorkspace from './components/PodWorkspace';

export default function PodLayout() {
  const { podId } = useParams();
  const { pods, switchPod } = usePod();

  // Sync current pod when URL changes
  React.useEffect(() => {
    if (podId) switchPod(podId);
  }, [podId, switchPod]);

  const pod = pods.find((p) => p.id === podId);

  if (!pod) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Pod not found</h2>
          <a href="/pods" className="text-purple-400 hover:text-purple-300">Back to Pods</a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#0a0a0f]">
      <PodSidebar podId={podId} pod={pod} />
      <PodWorkspace>
        <Outlet />
      </PodWorkspace>
    </div>
  );
}