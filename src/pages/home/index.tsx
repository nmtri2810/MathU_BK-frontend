import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Layout>
      <div>Home</div>

      <UnlockAccess request={[Role.Guest]}>
        <p>This is for guest</p>
      </UnlockAccess>

      <UnlockAccess request={[Role.User]}>
        <p>This is for user</p>
      </UnlockAccess>

      <UnlockAccess request={[Role.Moderator]}>
        <p>This is for mod</p>
      </UnlockAccess>
    </Layout>
  );
};

export default Home;
