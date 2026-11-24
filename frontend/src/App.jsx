import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import ProjectDetailPage from './pages/public/ProjectDetailPage';
import BlogListPage from './pages/public/BlogListPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin imports (hidden from public navigation)
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminResourceManager from './pages/admin/AdminResourceManager';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            {/* Public Portfolio Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Private Admin Login Route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminOverviewPage />} />
                <Route
                  path="projects"
                  element={<AdminResourceManager resourceKey="projects" />}
                />
                <Route
                  path="skills"
                  element={<AdminResourceManager resourceKey="skills" />}
                />
                <Route
                  path="certificates"
                  element={<AdminResourceManager resourceKey="certificates" />}
                />
                <Route
                  path="education"
                  element={<AdminResourceManager resourceKey="education" />}
                />
                <Route
                  path="experience"
                  element={<AdminResourceManager resourceKey="experience" />}
                />
                <Route
                  path="blogs"
                  element={<AdminResourceManager resourceKey="blogs" />}
                />
                <Route path="messages" element={<AdminMessagesPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}
