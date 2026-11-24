import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Mail,
  UserCog,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sidebarItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/admin/skills', label: 'Skills', icon: Wrench },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/blogs', label: 'Blog Posts', icon: BookOpen },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/profile', label: 'Profile & Settings', icon: UserCog },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#10131C] border-r border-[#1F2433] flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 px-5 border-b border-[#1F2433] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="font-mono font-semibold text-sm text-slate-100">
              salma<span className="text-cyan-400">.admin</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-500/15 text-violet-200 border border-violet-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#181C28]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1F2433] space-y-3">
          <div className="px-2">
            <p className="text-[11px] font-mono text-slate-500">Signed in as</p>
            <p className="text-xs font-mono text-slate-300 truncate">
              {admin?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 hover:bg-rose-950/50 text-xs font-mono transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-4 sm:px-8 border-b border-[#1F2433] bg-[#0D1017] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="lg:hidden p-2 rounded-xl bg-[#12151E] border border-[#1F2433] text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="font-mono text-xs text-slate-400 hidden sm:inline">
            Private Portfolio Control Panel
          </span>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#12151E] border border-[#1F2433] hover:border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
