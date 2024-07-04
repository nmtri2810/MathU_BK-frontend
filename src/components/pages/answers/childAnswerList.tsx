import SanitizeHTML from '@/components/common/sanitizeHTML';
import { IChildAnswer } from '@/interfaces/answer';
import { cn, formatTimeFromNow } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface IChildAnswerListProps {
  childAnswerList: IChildAnswer[];
}

const ChildAnswerList: React.FC<IChildAnswerListProps> = ({ childAnswerList }) => {
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
        </div>
      ))}
    </div>
  );
};

export default ChildAnswerList;
