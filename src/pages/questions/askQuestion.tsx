import { Path } from '@/constants/enum';
import Layout from '@/layout/mainLayout';
import { I18nKeys } from '@/locales/i18nKeys';
import { useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CreateQuestionForm from '@/pages/questions/createQuestionForm';

const AskQuestionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
    }
  }, [navigate, t, user]);

  return (
    <Layout>
      <h1 className='text-3xl font-bold'>{t(I18nKeys.GLOBAL.ASK_QUESTION)}</h1>
      <CreateQuestionForm isEdit={false} />
    </Layout>
  );
};

export default AskQuestionScreen;
