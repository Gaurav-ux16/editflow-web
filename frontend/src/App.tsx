// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import EditProjectPage from './pages/EditProjectPage';

// Layout
import AppLayout from './components/layout/AppLayout';
import ClientRoutes from './client/ClientRoutes';

// ─── Protected Route helper (Login disabled) ──────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      {/* Client Module (Member 1) */}
      <Route path="/client/*" element={<ClientRoutes />} />

      {/* Default navigation and auth redirects */}
      <Route path="/" element={<Navigate to="/client/dashboard" replace />} />
      <Route path="/login" element={<Navigate to="/client/dashboard" replace />} />
      <Route path="/register" element={<Navigate to="/client/dashboard" replace />} />

      {/* Shared/Legacy routes wrapped in AppLayout */}
      <Route
        path="/legacy"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/create" element={<CreateProjectPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="projects/:id/edit" element={<EditProjectPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
    </Routes>
  );
}
