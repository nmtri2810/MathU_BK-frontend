import { Role } from '@/constants';
import { Path } from '@/constants/enum';
import { useAppSelector } from '@/store/hooks';
import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IRoleBasedRouteProps {
  roles: number[];
}

interface IUnlockAccess {
  children: ReactNode;
  request: number[];
}

const isGrantPermission = (roleId: number, roles: number[]) => {
  if (!roleId && roles.includes(Role.Guest)) {
    return true;
  }

  return roles.includes(roleId as number);
};

export const UnlockAccess = ({ children, request }: IUnlockAccess) => {
  const roleId = useAppSelector((state) => state.auth.user?.role.id);
  const permission = isGrantPermission(roleId as number, request);

  return <>{permission && children}</>;
};

const RoleBasedRoute: React.FC<IRoleBasedRouteProps> = ({ roles }) => {
  // Have roleId means that login success
  const roleId = useAppSelector((state) => state.auth.user?.role.id);

  return isGrantPermission(roleId as number, roles) ? <Outlet /> : <Navigate to={Path.UNAUTHORIZED} replace />;
};

export default RoleBasedRoute;
