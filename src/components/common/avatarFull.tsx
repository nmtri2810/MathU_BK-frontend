import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleUserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IAvatarFullProps {
  imgUrl?: string;
  username?: string;
  className?: string;
}

const AvatarFull: React.FC<IAvatarFullProps> = ({ imgUrl, username, className }) => {
  return imgUrl ? (
    <Avatar className={cn('rounded-sm size-8 select-none', className)}>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>{`${username}_`}</AvatarFallback>
    </Avatar>
  ) : (
    <CircleUserRound className={cn('rounded-sm size-8 select-none', className)} />
  );
};

export default AvatarFull;
