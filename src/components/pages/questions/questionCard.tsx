import AvatarFull from '@/components/common/avatarFull';
import { Badge } from '@/components/ui/badge';
import { IQuestionBEResponse } from '@/interfaces/question';
import { I18nKeys } from '@/locales/i18nKeys';
import { Check } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cn } from '@/lib/utils';
dayjs.extend(relativeTime);

interface IQuestionCardProps {
  question: IQuestionBEResponse;
  isLast: boolean;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ question, isLast }) => {
  const { _count, title, description, tags, user, created_at } = question;
  const { t } = useTranslation();

  const hasAcceptedAnswer = question.answers.some((answer) => answer.is_accepted);

  const renderAnswerUI = (answerCount: number, hasAcceptedAnswer: boolean) => {
    if (answerCount === 0) {
      return <p>{t(I18nKeys.COUNT.ANSWER, { count: answerCount })}</p>;
    }

    const badgeClass = `w-fit rounded-sm px-1 text-sm font-normal border-success-600 ${
      hasAcceptedAnswer ? ' bg-success-600 text-white' : 'text-success-600'
    }`;

    return (
      <Badge variant='outline' className={badgeClass}>
        {hasAcceptedAnswer && <Check size={16} className='mr-1' />}
        <span>{t(I18nKeys.COUNT.ANSWER, { count: answerCount })}</span>
      </Badge>
    );
  };

  return (
    <div className={cn('flex border-t-1 p-4', isLast && 'border-b-1')}>
      <div className='mr-5 flex h-full min-w-28 flex-col items-end gap-2 text-sm'>
        <p>{t(I18nKeys.COUNT.VOTE, { count: _count.votes })}</p>
        {renderAnswerUI(_count.answers, hasAcceptedAnswer)}
        <p>{t(I18nKeys.COUNT.VIEW, { count: 0 })}</p> {/* temp */}
      </div>
      <div className='h-full w-full'>
        <h3>
          <Link className='text-blue-600 hover:text-blue-700' to='#'>
            {title}
          </Link>
        </h3>
        <p className='mt-1 text-sm'>{description}</p>
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex gap-2'>
            {tags.map((tag) => (
              <Badge key={tag.id} variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
                <Link className='block px-2.5 py-0.5 font-bold' to='#'>
                  {tag.name}
                </Link>
              </Badge>
            ))}
          </div>
          <div className='flex items-center gap-1 text-sm'>
            <AvatarFull className='size-5' />
            <Link className='text-blue-600 hover:text-blue-700' to=''>
              {user.username}
            </Link>
            <span className='font-bold'>{user.reputation}</span>
            <span className='text-gray-500'>
              {t(I18nKeys.GLOBAL.ASKED)} {dayjs(created_at).fromNow()} {/* i18n here */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
