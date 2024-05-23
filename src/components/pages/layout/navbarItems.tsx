import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface INavItemGroupProps {
  children: ReactNode;
  className?: string;
}

interface INavItemProps {
  children: ReactNode;
  fullHeight?: boolean;
  className?: string;
  link: string;
}

export const NavItemGroup: React.FC<INavItemGroupProps> = ({ children, className }) => (
  <div className={cn('nav-item-group flex gap-1 text-sm text-gray-600', className)}>{children}</div>
);

export const NavItem: React.FC<INavItemProps> = ({ children, fullHeight = false, className, link }) => (
  <Link
    to={link}
    className={cn(
      'flex h-full items-center justify-center px-4 py-1 font-normal hover:bg-accent hover:text-accent-foreground focus-visible:outline-none',
      fullHeight ? 'rounded-sm' : 'rounded-full',
      className
    )}
  >
    {children}
  </Link>
);
