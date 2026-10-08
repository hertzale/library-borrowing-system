import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem('authToken')) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
