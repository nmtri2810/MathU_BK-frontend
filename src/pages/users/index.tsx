import Layout from '@/layout/mainLayout';
import { I18nKeys } from '@/locales/i18nKeys';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>{t(I18nKeys.GLOBAL.USERS)}</h1>
      </div>
    </Layout>
  );
};

export default UserScreen;
