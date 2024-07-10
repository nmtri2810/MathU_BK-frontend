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
import { useAppDispatch } from '@/store/hooks';
import { createAnswerRequest, updateAnswerRequest } from '@/store/actions/answer';
import { ILoginUser } from '@/interfaces/auth';
import { IQuestionBEResponse } from '@/interfaces/question';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { toast } from 'sonner';
import ChildAnswerInput from '@/components/pages/answers/childAnswerInput';

export interface answerState {
  isOpen: boolean;
  answerId: number;
  content: string;
  showWarning: boolean;
}

interface IAnswerListProps {
  answers: IAnswer[] | undefined;
  user: ILoginUser | null;
  question: IQuestionBEResponse | null;
  callback: () => void;
}

// Temp vietnamese
const AnswerList: React.FC<IAnswerListProps> = ({ answers, user, question, callback }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [childAnswerState, setChildAnswerState] = useState<answerState>({
    isOpen: false,
    answerId: 0,
    content: '',
    showWarning: false
  });

  const [editAnswerState, setEditAnswerState] = useState<answerState>({
    isOpen: false,
    answerId: 0,
    content: '',
    showWarning: false
  });

  const handleOpenChild = (answerId: number) => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
      return;
    }

    setChildAnswerState({ isOpen: true, answerId, content: '', showWarning: false });
  };

  const handleCloseChild = () => {
    setChildAnswerState({ isOpen: false, answerId: 0, content: '', showWarning: false });
  };

  const handleSubmitChild = (answerId: number) => {
    if (childAnswerState.content.trim().length <= 15) {
      setChildAnswerState((prev) => ({ ...prev, showWarning: true }));
      return;
    }
    setChildAnswerState((prev) => ({ ...prev, showWarning: false }));

    if (!user || !question || !answerId) return;

    const requestData = {
      content: childAnswerState.content,
      parent_id: answerId,
      question_id: question.id,
      user_id: user.id
    };

    dispatch(createAnswerRequest({ ...requestData, callback }));
  };

  const handleCloseEdit = () => {
    setEditAnswerState({ isOpen: false, answerId: 0, content: '', showWarning: false });
  };

  const handleSubmitEdit = (answerId: number) => {
    if (editAnswerState.content.trim().length <= 15) {
      setEditAnswerState((prev) => ({ ...prev, showWarning: true }));
      return;
    }
    setEditAnswerState((prev) => ({ ...prev, showWarning: false }));

    if (!user || !question || !answerId) return;

    dispatch(
      updateAnswerRequest({ id: answerId, question_id: question.id, content: editAnswerState.content, callback })
    );
  };

  useEffect(() => {
    if (childAnswerState.content.trim().length > 15) setChildAnswerState((prev) => ({ ...prev, showWarning: false }));
    if (editAnswerState.content.trim().length > 15) setEditAnswerState((prev) => ({ ...prev, showWarning: false }));
  }, [childAnswerState.content, editAnswerState.content]);

  return (
    <>
      {answers?.map((answer, index) => (
        <div
          key={index}
          className={cn('mt-5 flex gap-6 border-t-1 pt-5', index === answers.length - 1 && 'border-b-1 pb-5')}
        >
          <VotesBtnGroup id={answer.id} type='answer' votes={answer.votes} callback={callback} />
          <div className='w-full grow'>
            {editAnswerState.isOpen && editAnswerState.answerId === answer.id ? (
              <>
                <h3 className='text-lg font-semibold'>Cập nhật câu trả lời</h3>
                <ChildAnswerInput
                  answer={answer}
                  showWarning={editAnswerState.showWarning}
                  text={editAnswerState.content}
                  setText={(text: string) => setEditAnswerState((prev) => ({ ...prev, content: text }))}
                  handleClose={handleCloseEdit}
                  handleSubmit={handleSubmitEdit}
                  className='mb-8'
                  btnSubmit='Cập nhật'
                />
              </>
            ) : (
              <div>
                <SanitizeHTML html={answer.content} />
                <div className='my-4 flex items-center justify-between'>
                  <UtilsLinkGroup
                    user={user}
                    question={question}
                    answer={answer}
                    isInQuestion={false}
                    callback={callback}
                    openEdit={() =>
                      setEditAnswerState({
                        isOpen: true,
                        answerId: answer.id,
                        content: answer.content,
                        showWarning: false
                      })
                    }
                  />
                  <UserData
                    className={cn(question?.user_id === answer?.user_id && 'rounded-md bg-[#edf5fd] p-2.5')}
                    username={answer.user.username}
                    reputation={answer.user.reputation}
                    createdAt={answer.created_at}
                    isInList={false}
                    isAnswers={true}
                  />
                </div>
              </div>
            )}

            {answer.children.length > 0 && (
              <ChildAnswerList childAnswerList={answer.children} question={question} callback={callback} />
            )}
            {childAnswerState.isOpen && childAnswerState.answerId === answer.id ? (
              <ChildAnswerInput
                answer={answer}
                showWarning={childAnswerState.showWarning}
                text={childAnswerState.content}
                setText={(text: string) => setChildAnswerState((prev) => ({ ...prev, content: text }))}
                handleClose={handleCloseChild}
                handleSubmit={handleSubmitChild}
                className='mt-8'
                btnSubmit={t(I18nKeys.ANSWER_SECTION.ADD_COMMENT)}
              />
            ) : (
              <Button
                variant='link'
                className='mt-4 h-fit p-0 font-normal text-[#c1c4c8]'
                onClick={() => handleOpenChild(answer.id)}
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
