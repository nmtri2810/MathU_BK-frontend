import React from 'react';
import { Spinner } from '@nextui-org/spinner';

const PageLoading: React.FC = () => {
  return (
    <div className='mt-96 flex h-full w-full items-center justify-center'>
      <Spinner label='Loading...' color='default' labelColor='foreground' size='lg' />
    </div>
  );
};

export default PageLoading;
