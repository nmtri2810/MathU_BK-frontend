import { Badge } from '@/components/ui/badge';
import { IQuestionBEResponse } from '@/interfaces/question';
import { I18nKeys } from '@/locales/i18nKeys';
import { Check } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { cn, formatTitleForURL } from '@/lib/utils';
import { Path } from '@/constants/enum';
import TagGroup from '@/components/common/tagGroup';
import UserData from '@/components/common/userData';
import SanitizeHTML from '@/components/common/sanitizeHTML';
dayjs.extend(relativeTime);

interface IQuestionCardProps {
  question: IQuestionBEResponse;
  isLast: boolean;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ question, isLast }) => {
  const { _count, title, description, tags, user, created_at, id } = question;
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);

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
          <Link
            className='text-blue-600 hover:text-blue-700'
            to={generatePath(Path.DETAIL_QUESTIONS, { id: String(id), title: formatTitleForURL(title) })}
          >
            {title}
          </Link>
        </h3>
        <SanitizeHTML className='mt-1 text-sm' html={description as string} />
        <div className='mt-2 flex items-center justify-between'>
          <TagGroup tags={tags} />
          <UserData username={user.username} reputation={user.reputation} createdAt={created_at} isInList={true} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
