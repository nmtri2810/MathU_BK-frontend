import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/auth/login';
import NotFound from '@/pages/common/NotFound';
import PrivateRoute from '@/routers/privateRoute';
import { Path } from '@/constants';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={Path.HOME_CLIENT} element={<Home />} />
        </Route>
        <Route path={Path.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
