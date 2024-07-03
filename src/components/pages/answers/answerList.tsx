import React from 'react';
import VotesBtnGroup from '@/components/pages/questions/votesBtnGroup';
import UtilsLinkGroup from '@/components/pages/questions/utilsLinkGroup';
import UserData from '@/components/common/userData';
import { Button } from '@/components/ui/button';
import { IAnswer } from '@/interfaces/answer';
import ChildAnswerList from '@/components/pages/answers/childAnswerList';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { cn } from '@/lib/utils';

interface IAnswerListProps {
  answers: IAnswer[] | undefined;
}

const AnswerList: React.FC<IAnswerListProps> = ({ answers }) => {
  const { t } = useTranslation();

  return (
    <>
      {answers?.map((answer, index) => (
        <div
          key={index}
          className={cn('mt-5 flex gap-6 border-t-1 pt-5', index === answers.length - 1 && 'border-b-1 pb-5')}
        >
          <VotesBtnGroup />
          <div className='w-full grow'>
            <div>{answer.content}</div>
            <div className='my-4 flex items-center justify-between'>
              <UtilsLinkGroup />
              <UserData
                username={answer.user.username}
                reputation={answer.user.reputation}
                createdAt={answer.created_at}
                isInList={false}
                isAnswers={true}
              />
            </div>
            <ChildAnswerList childAnswerList={answer.children} />
            <Button variant='link' className='mt-4 h-fit p-0 font-normal text-[#c1c4c8]'>
              {t(I18nKeys.ANSWER_SECTION.BTN_TEXT)}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnswerList;
