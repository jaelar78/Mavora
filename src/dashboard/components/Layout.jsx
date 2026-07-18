import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <Sidebar />
      <div className="lg:ml-72 min-h-screen">
        <Header />
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
