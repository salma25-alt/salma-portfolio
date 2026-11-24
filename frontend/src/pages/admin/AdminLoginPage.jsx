import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Lock, Terminal, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Check your credentials.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Portfolio</span>
        </Link>

        <div className="card-surface p-7 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-100">Admin Sign In</h1>
              <p className="text-xs font-mono text-slate-400">
                Private access for portfolio management
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="salma25@navgurukul.org"
                className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#0B0D12] border border-[#1F2433] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-white bg-brand-gradient hover:opacity-95 disabled:opacity-50 transition-opacity"
            >
              <Lock className="w-4 h-4" />
              <span>{submitting ? 'Signing in...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
