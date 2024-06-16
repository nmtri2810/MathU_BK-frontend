import React from 'react';
import { IMenuItemProps } from './toolBar';
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import { cn } from '@/lib/utils';

const MenuItem: React.FC<IMenuItemProps> = ({ icon, title, action, isActive, disabled }) => {
  return (
    <button
      className={cn(
        'size-7 rounded-md border-none bg-transparent p-1 text-[#535a60] hover:bg-accent',
        isActive && isActive() ? 'bg-[#f1f2f3] font-bold text-gray-900' : '',
        disabled && 'pointer-events-none text-gray-300'
      )}
      onClick={action}
      disabled={disabled}
      title={title}
    >
      <svg className='remix' height='100%' width='100%' fill='currentColor'>
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg>
    </button>
  );
};

export default MenuItem;
