import React from 'react';
import { Spinner } from '@nextui-org/spinner';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const PageLoading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-10 bg-white'>
      <div className='flex h-full w-full items-center justify-center'>
        <Spinner label={t(I18nKeys.GLOBAL.LOADING)} color='default' labelColor='foreground' size='lg' />
      </div>
    </div>
  );
};

export default PageLoading;
