import React, { useEffect, useState } from 'react';
import VotesBtnGroup from '@/components/pages/questions/votesBtnGroup';
import UtilsLinkGroup from '@/components/pages/questions/utilsLinkGroup';
import UserData from '@/components/common/userData';
import { Button } from '@/components/ui/button';
import { IAnswer } from '@/interfaces/answer';
import ChildAnswerList from '@/components/pages/answers/childAnswerList';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { cn } from '@/lib/utils';
import TiptapInput from '@/components/common/tiptapInput';
import { useAppDispatch } from '@/store/hooks';
import { createAnswerRequest } from '@/store/actions/answer';
import { ILoginUser } from '@/interfaces/auth';
import { IQuestionBEResponse } from '@/interfaces/question';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { toast } from 'sonner';

interface IAnswerListProps {
  answers: IAnswer[] | undefined;
  user: ILoginUser | null;
  question: IQuestionBEResponse | null;
  callback: () => void;
}

const AnswerList: React.FC<IAnswerListProps> = ({ answers, user, question, callback }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openChildAnswerInput, setOpenChildAnswerInput] = useState<{ isOpen: boolean; answerId: number }>({
    isOpen: false,
    answerId: 0
  });
  const [childAnswerData, setChildAnswerData] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  const handleOpenInput = (answerId: number) => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
      return;
    }

    setOpenChildAnswerInput({ isOpen: true, answerId });
    setShowWarning(false);
  };

  const handleCloseInput = () => {
    setOpenChildAnswerInput({ isOpen: false, answerId: 0 });
    setShowWarning(false);
    setChildAnswerData('');
  };

  const handleSubmit = (answerId: number) => {
    if (childAnswerData.trim().length <= 15) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);

    if (!user || !question || !answerId) return;

    const requestData = {
      content: childAnswerData,
      parent_id: answerId,
      question_id: question.id,
      user_id: user.id
    };

    dispatch(createAnswerRequest({ ...requestData, callback }));
  };

  useEffect(() => {
    if (childAnswerData.trim().length > 15) setShowWarning(false);
  }, [childAnswerData]);

  return (
    <>
      {answers?.map((answer, index) => (
        <div
          key={index}
          className={cn('mt-5 flex gap-6 border-t-1 pt-5', index === answers.length - 1 && 'border-b-1 pb-5')}
        >
          <VotesBtnGroup />
          <div className='w-full grow'>
            <SanitizeHTML html={answer.content} />
            <div className='my-4 flex items-center justify-between'>
              <UtilsLinkGroup user={user} question={question} answer={answer} isInQuestion={false} />
              <UserData
                username={answer.user.username}
                reputation={answer.user.reputation}
                createdAt={answer.created_at}
                isInList={false}
                isAnswers={true}
              />
            </div>
            {answer.children.length > 0 && <ChildAnswerList childAnswerList={answer.children} />}
            {openChildAnswerInput.isOpen && openChildAnswerInput.answerId === answer.id ? (
              <div className='mt-8 space-y-3'>
                <span className={cn('text-sm text-gray-500', showWarning ? 'text-destructive' : '')}>
                  {t(I18nKeys.ANSWER_SECTION.COMMENT_DESC)}
                </span>
                <TiptapInput value={childAnswerData} onChange={setChildAnswerData} />
                <div className='flex justify-end gap-3'>
                  <Button size='sm' variant='outline' onClick={() => handleCloseInput()}>
                    {t(I18nKeys.GLOBAL.CLOSE)}
                  </Button>
                  <Button
                    size='sm'
                    className='bg-blue-600 font-normal hover:bg-blue-700'
                    onClick={() => handleSubmit(answer.id)}
                  >
                    {t(I18nKeys.ANSWER_SECTION.ADD_COMMENT)}
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant='link'
                className='mt-4 h-fit p-0 font-normal text-[#c1c4c8]'
                onClick={() => handleOpenInput(answer.id)}
              >
                {t(I18nKeys.ANSWER_SECTION.BTN_TEXT)}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnswerList;
