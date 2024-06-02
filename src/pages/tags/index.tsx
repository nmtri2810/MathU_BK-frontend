import Layout from '@/layout/mainLayout';
import React from 'react';

const TagScreen: React.FC = () => {
  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>Tags</h1>
      </div>
    </Layout>
  );
};

export default TagScreen;
