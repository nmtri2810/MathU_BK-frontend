import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { Path } from '@/constants/enum';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { I18nKeys } from '@/locales/i18nKeys';

const AskQuestionBtn: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleNavigate = () => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
      return;
    }

    navigate(Path.ASK_QUESTIONS);
  };

  return (
    <Button onClick={handleNavigate} className='bg-blue-600 font-normal hover:bg-blue-700'>
      {t(I18nKeys.GLOBAL.ASK_QUESTION)}
    </Button>
  );
};

export default AskQuestionBtn;
