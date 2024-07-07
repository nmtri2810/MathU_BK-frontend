import { Button } from '@/components/ui/button';
import { IAnswer } from '@/interfaces/answer';
import { ILoginUser } from '@/interfaces/auth';
import { IQuestionBEResponse } from '@/interfaces/question';
import { I18nKeys } from '@/locales/i18nKeys';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IUtilsLinkGroupProps {
  user: ILoginUser | null;
  question: IQuestionBEResponse | null;
  answer?: IAnswer | null;
  isInQuestion: boolean;
}

const UtilsLinkGroup: React.FC<IUtilsLinkGroupProps> = ({ user, question, answer, isInQuestion }) => {
  const { t } = useTranslation();

  const isOwnerQues = user && question && user.id === question.user_id;
  const isOwnerAnswer = user && answer && user.id === answer.user_id;

  const utilsData = [
    { text: t(I18nKeys.GLOBAL.SHARE) },
    user !== null ? { text: t(I18nKeys.GLOBAL.FOLLOW) } : {},
    ...(isInQuestion && isOwnerQues ? [{ text: t(I18nKeys.GLOBAL.EDIT) }] : []),
    ...(!isInQuestion && isOwnerAnswer ? [{ text: t(I18nKeys.GLOBAL.EDIT) }] : [])
  ];

  return (
    <div className='space-x-3 text-sm'>
      {utilsData.map((data, index) => (
        <Button key={index} variant='link' className='mt-4 h-fit p-0 font-normal'>
          {data.text}
        </Button>
      ))}
    </div>
  );
};

export default UtilsLinkGroup;
