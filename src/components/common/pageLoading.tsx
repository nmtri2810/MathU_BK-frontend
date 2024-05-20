import React from 'react';
import { Spinner } from '@nextui-org/spinner';

const PageLoading: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-full h-full mt-96'>
      <Spinner label='Loading...' color='default' labelColor='foreground' size='lg' />
    </div>
  );
};

export default PageLoading;
