import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/auth/login';
import NotFound from '@/pages/common/NotFound';
import RoleBasedRoute from '@/routers/rolebasedRoute';
import { AdminPath, Path } from '@/constants/enum';
import { Role } from '@/constants';
import Unauthorized from '@/pages/common/unauthorized';
import HomeAdmin from '@/pages/admin/home';
import SignUp from '@/pages/auth/signup';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.SIGN_UP} element={<SignUp />} />
        <Route path={Path.NOT_FOUND} element={<NotFound />} />
        <Route path={Path.UNAUTHORIZED} element={<Unauthorized />} />

        <Route element={<RoleBasedRoute roles={[Role.Guest, Role.User, Role.Moderator]} />}>
          <Route path={Path.HOME_CLIENT} element={<Home />} />
        </Route>

        <Route element={<RoleBasedRoute roles={[Role.Admin]} />}>
          <Route path={AdminPath.HOME_ADMIN} element={<HomeAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
