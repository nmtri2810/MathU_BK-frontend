import BaseAlertDialog from '@/components/common/baseAlertDialog';
import { Button } from '@/components/ui/button';
import { IAnswer } from '@/interfaces/answer';
import { ILoginUser } from '@/interfaces/auth';
import { IQuestionBEResponse } from '@/interfaces/question';
import { I18nKeys } from '@/locales/i18nKeys';
import { deleteAnswerRequest } from '@/store/actions/answer';
import { deleteQuestionRequest } from '@/store/actions/question';
import { useAppDispatch } from '@/store/hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IUtilsLinkGroupProps {
  user: ILoginUser | null;
  question: IQuestionBEResponse | null;
  answer?: IAnswer | null;
  isInQuestion: boolean;
  callback: () => void;
  openEditQuestion: () => void;
}

// Temp vietnamese
const UtilsLinkGroup: React.FC<IUtilsLinkGroupProps> = ({
  user,
  question,
  answer,
  isInQuestion,
  callback,
  openEditQuestion
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const isOwnerQues = user && question && user.id === question.user_id;
  const isOwnerAnswer = user && answer && user.id === answer.user_id;

  const utilsData = [
    { text: t(I18nKeys.GLOBAL.SHARE), onClick: () => handleShare() },
    user !== null ? { text: t(I18nKeys.GLOBAL.FOLLOW), onClick: () => handleFollow() } : {},
    ...(isInQuestion && isOwnerQues
      ? [
          { text: t(I18nKeys.GLOBAL.EDIT), onClick: () => handleEdit() },
          { text: t(I18nKeys.GLOBAL.DELETE), onClick: () => setIsOpenConfirm(true) }
        ]
      : []),
    ...(!isInQuestion && isOwnerAnswer
      ? [
          { text: t(I18nKeys.GLOBAL.EDIT), onClick: () => handleEdit() },
          { text: t(I18nKeys.GLOBAL.DELETE), onClick: () => setIsOpenConfirm(true) }
        ]
      : [])
  ];

  const handleShare = () => {
    console.log('Share button clicked');
  };

  const handleFollow = () => {
    console.log('Follow button clicked');
  };

  const handleEdit = () => {
    if (question && !answer) {
      openEditQuestion();
    } else if (answer) {
      // edit answer
    }
  };

  const handleDelete = () => {
    if (question && !answer) {
      dispatch(deleteQuestionRequest({ id: question?.id, navigate }));
    } else if (answer) {
      dispatch(deleteAnswerRequest({ id: answer.id, callback }));
    }

    setIsOpenConfirm(false);
  };

  return (
    <div className='space-x-3 text-sm'>
      {utilsData.map((data, index) => (
        <Button key={index} variant='link' className='mt-4 h-fit p-0 font-normal' onClick={data.onClick}>
          {data.text}
        </Button>
      ))}

      {isOpenConfirm && (
        <BaseAlertDialog
          closeModal={() => setIsOpenConfirm(false)}
          confirmModal={handleDelete}
          title='Xác nhận'
          description={
            !answer
              ? 'Bạn có chắc chắn muốn xóa câu hỏi này? Câu hỏi này sẽ bị xóa khỏi hệ thống. Hãy kiểm tra kỹ nội dung trước khi xóa'
              : 'Bạn có chắc chắn muốn xóa câu trả lời này? Câu trả lời này sẽ bị xóa khỏi hệ thống. Hãy kiểm tra kỹ nội dung trước khi xóa'
          }
        ></BaseAlertDialog>
      )}
    </div>
  );
};

export default UtilsLinkGroup;
