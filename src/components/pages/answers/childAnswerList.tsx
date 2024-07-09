import BaseAlertDialog from '@/components/common/baseAlertDialog';
import BaseTooltip from '@/components/common/baseTooltip';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { IChildAnswer } from '@/interfaces/answer';
import { cn, formatTimeFromNow } from '@/lib/utils';
import { I18nKeys } from '@/locales/i18nKeys';
import { deleteAnswerRequest } from '@/store/actions/answer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IChildAnswerListProps {
  childAnswerList: IChildAnswer[];
  callback: () => void;
}

// temp Vietnamese
const ChildAnswerList: React.FC<IChildAnswerListProps> = ({ childAnswerList, callback }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [answerId, setAnswerId] = useState<number>();

  const user = useAppSelector((state) => state.auth.user);

  const handleDelete = () => {
    if (answerId) {
      dispatch(deleteAnswerRequest({ id: answerId, callback }));
    }

    setIsOpenConfirm(false);
  };

  return (
    <div className='pl-4'>
      {childAnswerList.map((childAnswer, index) => (
        <div
          key={index}
          className={cn('border-t-1 py-4 text-sm', index === childAnswerList.length - 1 && 'border-b-1')}
        >
          <span>{<SanitizeHTML className='inline-block' html={childAnswer.content} />} - </span>
          <Link className='text-blue-600 hover:text-blue-700' to=''>
            {childAnswer.user.username}
          </Link>
          <span className='text-gray-500'> {formatTimeFromNow(childAnswer.created_at)}</span>
          {user?.id === childAnswer.user_id && (
            <div className='ml-4 inline-block'>
              <BaseTooltip side='bottom' content={<div className='max-w-52'>{t(I18nKeys.GLOBAL.EDIT)}</div>}>
                <Pencil
                  className='ml-3 inline-block hover:cursor-pointer hover:opacity-70'
                  size={20}
                  strokeWidth={1.5}
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
      ))}

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
