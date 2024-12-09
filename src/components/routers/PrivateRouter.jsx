
import{ useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './../../ContextProviders/AuthContextProvider';

export const PrivateRouter = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <span className="loading loading-bars loading-lg"></span>

  if (!user) {
    return <Navigate state={location.pathname} to='/login' />
  }

  return children;
};


