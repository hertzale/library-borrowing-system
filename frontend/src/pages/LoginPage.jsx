import { Navigate } from 'react-router-dom';
import LoginForm from '../components/student/LoginForm';

export default function LoginPage() {
  if (localStorage.getItem('authToken')) {
    return <Navigate to="/student" replace />;
  }
  return <LoginForm />;
}
