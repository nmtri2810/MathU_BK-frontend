import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface IQuestionCardProps {
  title: string;
  excerpt: string;
}

const QuestionCard: React.FC<IQuestionCardProps> = ({ title, excerpt }) => {
  return (
    <div className='flex border-t-1 p-4'>
      <div className='mr-5 flex h-full min-w-28 flex-col items-end gap-1 text-sm'>
        <p>0 votes</p>
        <p>0 answers</p>
        <Badge
          variant='outline'
          className='w-fit rounded-sm border-success-600 px-1 text-sm font-normal text-success-600'
        >
          2 answers
        </Badge>
        <Badge
          variant='outline'
          className='w-fit rounded-sm border-success-600 bg-success-600 px-1 text-sm font-normal text-white'
        >
          <Check size={16} className='mr-1' />
          <span>3 answers</span>
        </Badge>
        <p>0 views</p>
      </div>
      <div className='flex h-full w-full flex-col gap-2'>
        <h3>
          <Link className='text-blue-600 hover:text-blue-700' to='#'>
            {title}
          </Link>
        </h3>
        <p className='text-sm'>{excerpt}</p>
        <div className='mt-1 flex gap-2'>
          <Badge variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
            <Link className='block px-2.5 py-0.5 font-bold' to='#'>
              MySQL
            </Link>
          </Badge>
          <Badge variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
            <Link className='block px-2.5 py-0.5 font-bold' to='#'>
              Javascript
            </Link>
          </Badge>
          <Badge variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
            <Link className='block px-2.5 py-0.5 font-bold' to='#'>
              Java
            </Link>
          </Badge>
          <Badge variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
            <Link className='block px-2.5 py-0.5 font-bold' to='#'>
              Python
            </Link>
          </Badge>
          <Badge variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
            <Link className='block px-2.5 py-0.5 font-bold' to='#'>
              PHP
            </Link>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
