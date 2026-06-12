// src/composents/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Vérifier si l'utilisateur est connecté (basé sur notre token fictif)
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const user = localStorage.getItem('user');
  
  // Vérification complète de l'authentification
  const isLoggedIn = token && isAuthenticated === 'true' && user;
  
  console.log('ProtectedRoute - État authentification:', { 
    token: !!token, 
    isAuthenticated, 
    user: !!user, 
    isLoggedIn 
  });
  
  if (!isLoggedIn) {
    // Rediriger vers la page de connexion avec l'URL demandée
    return <Navigate to="/connexion" replace />;
  }
  
  // Si l'utilisateur est connecté, afficher le contenu protégé
  return children;
}