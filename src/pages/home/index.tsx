import AskQuestionBtn from '@/components/pages/questions/askQuestionBtn';
import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { I18nKeys } from '@/locales/i18nKeys';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>{t(I18nKeys.HOME_SCREEN.TOP_QUESTIONS)}</h1>
        <AskQuestionBtn />
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
