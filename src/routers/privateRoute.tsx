import { Path } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.tokens?.accessToken);

  return accessToken ? <Outlet /> : <Navigate to={Path.LOGIN} replace />;
};

export default PrivateRoute;
