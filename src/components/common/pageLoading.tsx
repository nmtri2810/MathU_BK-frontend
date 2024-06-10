import React from 'react';
import { Spinner } from '@nextui-org/spinner';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const PageLoading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='mt-96 flex h-full w-full items-center justify-center'>
      <Spinner label={t(I18nKeys.GLOBAL.LOADING)} color='default' labelColor='foreground' size='lg' />
    </div>
  );
};

export default PageLoading;
