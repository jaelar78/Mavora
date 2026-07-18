/******  GLOBAL LAYOUT — For global pages (AI Assistant, Tools, etc.)  ******/
import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalSidebar from './GlobalSidebar';

export default function GlobalLayout() {
  return (
    <div className="h-screen flex bg-[#0a0a0f]">
      <GlobalSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}