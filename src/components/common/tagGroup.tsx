import { ITag } from '@/interfaces/tag';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ITagGroupProps {
  tags: ITag[] | undefined;
  className?: string;
}

const TagGroup: React.FC<ITagGroupProps> = ({ tags, className }) => {
  return (
    <div className={cn('flex gap-2', className)}>
      {tags?.map((tag, index) => (
        <Badge key={`${tag.id}_${index}`} variant='secondary' className='rounded-sm bg-[#f1f2f3] p-0 hover:bg-accent'>
          <Link className='block px-2.5 py-0.5 font-bold' to='#'>
            {tag.name}
          </Link>
        </Badge>
      ))}
    </div>
  );
};

export default TagGroup;
