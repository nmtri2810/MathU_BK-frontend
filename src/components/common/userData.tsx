import React from 'react';
import AvatarFull from '@/components/common/avatarFull';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import { cn, dayjsFormat, formatTimeFromNow } from '@/lib/utils';
import { DateFormat } from '@/constants';

interface IUserDataProps {
  username: string | undefined;
  reputation: number | undefined;
  createdAt: string | undefined;
  isInList: boolean;
  className?: string;
  isAnswers?: boolean;
}

const UserData: React.FC<IUserDataProps> = ({
  username,
  reputation,
  createdAt,
  isInList,
  className,
  isAnswers = false
}) => {
  const { t } = useTranslation();

  const createdTime = (
    <span className='text-gray-500'>
      {isInList
        ? `${t(I18nKeys.GLOBAL.ASKED)} ${formatTimeFromNow(createdAt)}`
        : `${t(isAnswers ? I18nKeys.DETAIL_QUESTION_SCREEN.USER_ANSWERED_TIME : I18nKeys.DETAIL_QUESTION_SCREEN.USER_ASKED_TIME)} ${dayjsFormat(createdAt, DateFormat.USER_DATA)}`}
    </span>
  );

  const userLink = (
    <Link className='text-blue-600 hover:text-blue-700' to=''>
      {username}
    </Link>
  );

  const userDataInList = (
    <div className={cn('flex shrink-0 items-center gap-1 text-sm', className)}>
      <AvatarFull className='size-5' />
      {userLink}
      <span className='font-bold'>{reputation}</span>
      {createdTime}
    </div>
  );

  const userDataInDetail = (
    <div className={cn('text-sm', className)}>
      {createdTime}
      <div className='mt-1 flex items-center gap-1'>
        <AvatarFull className='size-9' />
        <div>
          {userLink}
          <p className='font-semibold'>{reputation}</p>
        </div>
      </div>
    </div>
  );

  return isInList ? userDataInList : userDataInDetail;
};

export default UserData;
