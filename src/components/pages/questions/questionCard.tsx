import AvatarFull from '@/components/common/avatarFull';
import { Badge } from '@/components/ui/badge';
import { IListQuestion } from '@/interfaces/question';
import { Check } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface IQuestionCardProps {
  question: IListQuestion;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ question }) => {
  const { _count, title, description, tags, user, created_at } = question;

  const hasAcceptedAnswer = question.answers.some((answer) => answer.is_accepted);

  const renderAnswerUI = (answerCount: number, hasAcceptedAnswer: boolean) => {
    if (answerCount === 0) {
      return <p>{answerCount} answers</p>;
    }

    const badgeClass = `w-fit rounded-sm px-1 text-sm font-normal border-success-600 ${
      hasAcceptedAnswer ? ' bg-success-600 text-white' : 'text-success-600'
    }`;

    return (
      <Badge variant='outline' className={badgeClass}>
        {hasAcceptedAnswer && <Check size={16} className='mr-1' />}
        <span>{answerCount} answers</span>
      </Badge>
    );
  };

  return (
    <div className='flex border-t-1 p-4'>
      <div className='mr-5 flex h-full min-w-28 flex-col items-end gap-2 text-sm'>
        <p>{_count.votes} votes</p>
        {renderAnswerUI(_count.answers, hasAcceptedAnswer)}
        <p>0 views</p> {/* temp */}
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
            <span className='text-gray-500'>asked {created_at}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
