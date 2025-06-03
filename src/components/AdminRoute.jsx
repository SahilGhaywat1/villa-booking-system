import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin() ? children : <Navigate to="/login" />;
  
};

export default AdminRoute;