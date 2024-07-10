import BaseAlertDialog from '@/components/common/baseAlertDialog';
import BaseTooltip from '@/components/common/baseTooltip';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { IAnswer, IChildAnswer } from '@/interfaces/answer';
import { cn, formatTimeFromNow } from '@/lib/utils';
import { I18nKeys } from '@/locales/i18nKeys';
import { deleteAnswerRequest, updateAnswerRequest } from '@/store/actions/answer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { answerState } from './answerList';
import ChildAnswerInput from './childAnswerInput';
import { IQuestionBEResponse } from '@/interfaces/question';

interface IChildAnswerListProps {
  childAnswerList: IChildAnswer[];
  question: IQuestionBEResponse | null;
  callback: () => void;
}

// temp Vietnamese
const ChildAnswerList: React.FC<IChildAnswerListProps> = ({ childAnswerList, question, callback }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [answerId, setAnswerId] = useState<number>();

  const [editChildAnswerState, setEditChildAnswerState] = useState<answerState>({
    isOpen: false,
    answerId: 0,
    content: '',
    showWarning: false
  });

  const user = useAppSelector((state) => state.auth.user);
  const isQuestionHasAcceptedAnswer = question?.answers.some((answer) => answer.is_accepted);

  const handleDelete = () => {
    if (answerId) {
      dispatch(deleteAnswerRequest({ id: answerId, callback }));
    }

    setIsOpenConfirm(false);
  };

  const handleCloseEdit = () => {
    setEditChildAnswerState({ isOpen: false, answerId: 0, content: '', showWarning: false });
  };

  const handleSubmitEdit = (answerId: number) => {
    if (editChildAnswerState.content.trim().length <= 15) {
      setEditChildAnswerState((prev) => ({ ...prev, showWarning: true }));
      return;
    }
    setEditChildAnswerState((prev) => ({ ...prev, showWarning: false }));

    if (!user || !question || !answerId) return;

    dispatch(
      updateAnswerRequest({ id: answerId, question_id: question.id, content: editChildAnswerState.content, callback })
    );
  };

  return (
    <div className='pl-4'>
      {childAnswerList.map((childAnswer, index) =>
        editChildAnswerState.isOpen && editChildAnswerState.answerId === childAnswer.id ? (
          <div key={index} className='border-t-1 pt-4'>
            <h3 className='text-lg font-semibold'>Cập nhật câu trả lời</h3>
            <ChildAnswerInput
              answer={childAnswer as IAnswer}
              showWarning={editChildAnswerState.showWarning}
              text={editChildAnswerState.content}
              setText={(text: string) => setEditChildAnswerState((prev) => ({ ...prev, content: text }))}
              handleClose={handleCloseEdit}
              handleSubmit={handleSubmitEdit}
              className='mb-4'
              btnSubmit='Cập nhật'
            />
          </div>
        ) : (
          <div
            key={index}
            className={cn('border-t-1 py-4 text-sm', index === childAnswerList.length - 1 && 'border-b-1')}
          >
            <span>{<SanitizeHTML className='inline-block' html={childAnswer.content} />} - </span>
            <Link className='text-blue-600 hover:text-blue-700' to=''>
              {childAnswer.user.username}
            </Link>
            <span className='text-gray-500'> {formatTimeFromNow(childAnswer.created_at)}</span>
            {user?.id === childAnswer.user_id && !isQuestionHasAcceptedAnswer && (
              <div className='ml-4 inline-block'>
                <BaseTooltip side='bottom' content={<div className='max-w-52'>{t(I18nKeys.GLOBAL.EDIT)}</div>}>
                  <Pencil
                    className='ml-3 inline-block hover:cursor-pointer hover:opacity-70'
                    size={20}
                    strokeWidth={1.5}
                    onClick={() =>
                      setEditChildAnswerState({
                        isOpen: true,
                        answerId: childAnswer.id,
                        content: childAnswer.content,
                        showWarning: false
                      })
                    }
                  />
                </BaseTooltip>
                <BaseTooltip side='bottom' content={<div className='max-w-52'>{t(I18nKeys.GLOBAL.DELETE)}</div>}>
                  <Trash2
                    className='ml-3 inline-block hover:cursor-pointer hover:opacity-70'
                    size={20}
                    strokeWidth={1.5}
                    onClick={() => {
                      setIsOpenConfirm(true);
                      setAnswerId(childAnswer.id);
                    }}
                  />
                </BaseTooltip>
              </div>
            )}
          </div>
        )
      )}

      {isOpenConfirm && (
        <BaseAlertDialog
          closeModal={() => setIsOpenConfirm(false)}
          confirmModal={handleDelete}
          title='Xác nhận'
          description='Bạn có chắc chắn muốn xóa câu trả lời này? Câu trả lời này sẽ bị xóa khỏi hệ thống. Hãy kiểm tra kỹ nội dung trước khi xóa'
        ></BaseAlertDialog>
      )}
    </div>
  );
};

export default ChildAnswerList;
