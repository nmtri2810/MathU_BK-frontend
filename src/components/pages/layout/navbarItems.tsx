import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface INavItemGroupProps {
  children: ReactNode;
  className?: string;
}

interface INavItemProps {
  children: ReactNode;
  fullHeight?: boolean;
  className?: string;
  onClick: () => void;
}

export const NavItemGroup: React.FC<INavItemGroupProps> = ({ children, className }) => (
  <div className={cn('nav-item-group flex gap-1 text-sm text-gray-600', className)}>{children}</div>
);

export const NavItem: React.FC<INavItemProps> = ({ children, fullHeight = false, className, onClick }) => (
  <Button
    variant='ghost'
    className={cn('h-full px-4 py-1 font-normal', fullHeight ? 'rounded-sm' : 'rounded-full', className)}
    onClick={onClick}
  >
    {children}
  </Button>
);
