// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './composents/Navbar';
import AdminLayout from './composents/AdminLayout';
import HeroSection from './composents/HeroSection';
import SchoolsSection from './composents/SchoolsSection';
import QuestionnaireSection from './composents/QuestionnaireSection';
import ConnexionPage from './composents/ConnexionPage';
import BlogPage from './composents/BlogPage';
import ProtectedRoute from './composents/ProtectedRoute';
import ProfilePage from './composents/ProfilePage';
import NotFoundPage from './composents/NotFoundPage';
import AdminDashboard from './composents/AdminDashboard';
import BlogDetail from './composents/BlogDetail';
import AdminUsers from './composents/AdminUsers';
import AdminStudents from './composents/AdminStudents';
import AdminSchools from './composents/AdminSchools';

function App() {
  return (
    <Routes>
      {/* Routes publiques AVEC Navbar */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HeroSection />
          </>
        }
      />
      <Route
        path="/annuaire"
        element={
          <>
            <Navbar />
            <SchoolsSection />
          </>
        }
      />
      <Route
        path="/connexion"
        element={
          <>
            <Navbar />
            <ConnexionPage />
          </>
        }
      />
      <Route
        path="/blog"
        element={
          <>
            <Navbar />
            <BlogPage />
          </>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <>
            <Navbar />
            <BlogDetail />
          </>
        }
      />

      {/* Routes protégées AVEC Navbar */}
      <Route
        path="/profile"
        element={
          <>
            <Navbar />
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </>
        }
      />
      <Route
        path="/questionnaire"
        element={
          <>
            <Navbar />
            <ProtectedRoute>
              <QuestionnaireSection />
            </ProtectedRoute>
          </>
        }
      />

      {/* Routes Admin SANS Navbar (AdminLayout a sa propre navbar) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="schools" element={<AdminSchools />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;