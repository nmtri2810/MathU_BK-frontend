import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Check, ChevronDown, ChevronUp } from 'lucide-react';
import BaseTooltip from '@/components/common/baseTooltip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Path } from '@/constants/enum';
import { toast } from 'sonner';
import { I18nKeys } from '@/locales/i18nKeys';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createVoteRequest, deleteVoteRequest, updateVoteRequest } from '@/store/actions/vote';
import { IVote } from '@/interfaces/vote';
import { cn } from '@/lib/utils';
import BaseAlertDialog from '@/components/common/baseAlertDialog';
import { updateAnswerRequest } from '@/store/actions/answer';

interface IVotesBtnGroupProps {
  id: number;
  type: 'question' | 'answer';
  votes: IVote[];
  callback: () => void;
}

const VotesBtnGroup: React.FC<IVotesBtnGroupProps> = ({ id, type, votes, callback }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user);
  const question = useAppSelector((state) => state.question.one);

  const handleVotesValue = (isUpvote: boolean) => {
    if (!votes || !user) return;

    return votes.some((vote: IVote) => vote.user_id === user.id && vote.is_upvoted === isUpvote);
  };

  const handleVotesCount = () => {
    if (!votes) return;

    return votes.reduce((count, vote) => count + (vote.is_upvoted ? 1 : -1), 0);
  };

  const handleVote = (isUpvote: boolean) => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
      return;
    }

    const userVote = votes.find((vote: IVote) => vote.user_id === user.id);

    if (userVote) {
      if (userVote.is_upvoted === isUpvote) {
        dispatch(deleteVoteRequest({ id: userVote.id, callback }));
      } else {
        dispatch(updateVoteRequest({ id: userVote.id, is_upvoted: isUpvote, callback }));
      }
    } else {
      dispatch(createVoteRequest({ is_upvoted: isUpvote, user_id: user.id, [`${type}_id`]: id, callback }));
    }
  };

  const updateAcceptAnswer = () => {
    if (!user || !question) return;

    dispatch(updateAnswerRequest({ id: id, question_id: question?.id, is_accepted: true, callback }));
    setIsOpenConfirm(false);
    // temp
    window.location.reload();
  };

  const renderAcceptButton = () => {
    const userCreatedQuestion = user?.id === question?.user_id;
    const isQuestionHasAcceptedAnswer = question?.answers.some((answer) => answer.is_accepted);
    const isAcceptedAnswer = question?.answers.some((answer) => answer.id === id && answer.is_accepted);

    if (
      (userCreatedQuestion && isQuestionHasAcceptedAnswer && isAcceptedAnswer) ||
      (userCreatedQuestion && !isQuestionHasAcceptedAnswer) ||
      (!userCreatedQuestion && isQuestionHasAcceptedAnswer && isAcceptedAnswer)
    ) {
      return (
        <BaseTooltip
          content={
            <div className='max-w-52'>
              {isAcceptedAnswer
                ? t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.ANSWER_ACCEPTED)
                : t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.ACCEPT_ANSWER)}
            </div>
          }
        >
          <Button variant='link' className='h-fit p-0' onClick={() => !isAcceptedAnswer && setIsOpenConfirm(true)}>
            <Check
              size={46}
              strokeWidth={3.5}
              className={cn(isAcceptedAnswer ? 'cursor-default text-success-600' : 'text-gray-300 hover:text-gray-400')}
            />
          </Button>
        </BaseTooltip>
      );
    }

    return null;
  };

  return (
    <div className='flex shrink-0 flex-col items-center gap-3'>
      <BaseTooltip
        content={
          <div className='max-w-52'>
            {type === 'question'
              ? t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.UPVOTE_QUESTION)
              : t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.UPVOTE_ANSWER)}
          </div>
        }
      >
        <Button
          variant='outline'
          className={cn('rounded-full p-0', handleVotesValue(true) && 'bg-secondary')}
          onClick={() => handleVote(true)}
        >
          <ChevronUp size={36} strokeWidth={1} />
        </Button>
      </BaseTooltip>
      <span className='text-xl font-bold'>{handleVotesCount()}</span>
      <BaseTooltip
        content={
          <div className='max-w-52'>
            {type === 'question'
              ? t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.DOWNVOTE_QUESTION)
              : t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.DOWNVOTE_ANSWER)}
          </div>
        }
      >
        <Button
          variant='outline'
          className={cn('rounded-full p-0', handleVotesValue(false) && 'bg-secondary')}
          onClick={() => handleVote(false)}
        >
          <ChevronDown size={36} strokeWidth={1} />
        </Button>
      </BaseTooltip>
      <BaseTooltip
        content={
          <div className='max-w-52'>{t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.SAVE, { field: t(type) })}</div>
        }
      >
        <Button variant='link' className='h-fit p-0'>
          <Bookmark size={22} className='text-gray-300 hover:text-gray-400' />
        </Button>
      </BaseTooltip>
      {type === 'answer' && renderAcceptButton()}

      {isOpenConfirm && (
        <BaseAlertDialog
          closeModal={() => setIsOpenConfirm(false)}
          confirmModal={updateAcceptAnswer}
          title={t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.MODAL_TITLE)}
          description={t(I18nKeys.DETAIL_QUESTION_SCREEN.VOTES_BTN_GR.MODAL_DESC)}
        ></BaseAlertDialog>
      )}
    </div>
  );
};

export default VotesBtnGroup;
