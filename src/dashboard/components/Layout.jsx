import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-cream noise-bg">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <footer className="py-3 px-6 border-t border-warm-border bg-white text-center">
          <p className="text-xs text-warm-muted">
            Powered by <span className="font-semibold text-warm-charcoal">Anglow Digital PTY LTD</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
