import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, ChevronDown, ChevronUp } from 'lucide-react';

const VotesBtnGroup: React.FC = () => {
  return (
    <div className='flex shrink-0 flex-col items-center gap-3'>
      <Button variant='outline' className='rounded-full p-0'>
        <ChevronUp size={36} strokeWidth={1} />
      </Button>
      <span className='text-xl font-bold'>0</span>
      <Button variant='outline' className='rounded-full p-0'>
        <ChevronDown size={36} strokeWidth={1} />
      </Button>
      <Button variant='link' className='h-fit p-0'>
        <Bookmark size={22} className='text-gray-300 hover:text-gray-400' />
      </Button>
    </div>
  );
};

export default VotesBtnGroup;
