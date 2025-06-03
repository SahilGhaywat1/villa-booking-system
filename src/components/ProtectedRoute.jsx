import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
