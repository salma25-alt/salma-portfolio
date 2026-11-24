import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-slate-300 font-mono text-sm">
        Verifying admin session...
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
