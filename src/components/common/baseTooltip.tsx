import React, { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface IBaseTooltipProps {
  children: ReactNode;
  content: ReactNode;
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left' | undefined;
}

const BaseTooltip: React.FC<IBaseTooltipProps> = ({ children, content, delayDuration = 300, side = 'right' }) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BaseTooltip;
