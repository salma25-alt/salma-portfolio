import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Wrench,
  Award,
  BookOpen,
  Mail,
  ArrowRight,
} from 'lucide-react';
import api from '../../services/api';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/overview')
      .then((res) => setStats(res.data.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Projects',
      value: stats?.projectsCount ?? '—',
      to: '/admin/projects',
      icon: FolderGit2,
      accent: 'text-violet-400',
    },
    {
      label: 'Skills',
      value: stats?.skillsCount ?? '—',
      to: '/admin/skills',
      icon: Wrench,
      accent: 'text-cyan-400',
    },
    {
      label: 'Certificates',
      value: stats?.certificatesCount ?? '—',
      to: '/admin/certificates',
      icon: Award,
      accent: 'text-blue-400',
    },
    {
      label: 'Blog Posts',
      value: stats?.blogsCount ?? '—',
      to: '/admin/blogs',
      icon: BookOpen,
      accent: 'text-emerald-400',
    },
    {
      label: 'Unread Messages',
      value: stats?.unreadMessagesCount ?? '—',
      sub: `Total: ${stats?.totalMessagesCount ?? 0}`,
      to: '/admin/messages',
      icon: Mail,
      accent: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your portfolio content, uploaded documents, and incoming messages.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-sm text-slate-400">Loading metrics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.to}
                className="card-surface card-surface-hover p-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-100">
                    {card.value}
                  </p>
                  {card.sub && (
                    <p className="mt-1 text-xs font-mono text-slate-500">
                      {card.sub}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`p-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] ${card.accent}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
