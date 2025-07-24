import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles = [] }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
