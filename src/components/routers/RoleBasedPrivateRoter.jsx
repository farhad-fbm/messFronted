import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './../../ContextProviders/AuthContextProvider';

export const RoleBasedPrivateRouter = ({ children, allowedRoles }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate state={{ from: location.pathname }} to='/unauthorized' />;
    // <Navigate state={location.pathname} to='/unauthorized' />
  }

  return children; 
};
