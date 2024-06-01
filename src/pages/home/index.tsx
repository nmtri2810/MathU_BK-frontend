import { Button } from '@/components/ui/button';
import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>Top Questions</h1>
        <Button className='bg-blue-600 font-normal hover:bg-blue-700'>Ask Question</Button>
      </div>

      <UnlockAccess request={[Role.Guest]}>
        <p>This is for guest</p>
      </UnlockAccess>

      <UnlockAccess request={[Role.User]}>
        <div className='h-[2000px]'>
          <p>This is for user</p>
        </div>
      </UnlockAccess>

      <UnlockAccess request={[Role.Moderator]}>
        <p>This is for mod</p>
      </UnlockAccess>
    </Layout>
  );
};

export default Home;
