/******  DASHBOARD SHELL  ******/
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './Header';
import DashboardSidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f]">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}