import { Button } from '@/components/ui/button';
import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import { logoutRequest } from '@/store/actions/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutRequest({ navigate }));
  };

  return (
    <Layout>
      <div>Home</div>

      <UnlockAccess request={[Role.Guest]}>
        <p>This is for guest</p>
      </UnlockAccess>

      <UnlockAccess request={[Role.User]}>
        <p>This is for user</p>
        <Button onClick={handleLogout}>Logout</Button>
      </UnlockAccess>

      <UnlockAccess request={[Role.Moderator]}>
        <p>This is for mod</p>
        <Button onClick={handleLogout}>Logout</Button>
      </UnlockAccess>

      <div>Email: {user?.email}</div>
      <div>Role: {user?.role.id}</div>
    </Layout>
  );
};

export default Home;
