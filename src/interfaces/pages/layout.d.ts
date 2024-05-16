import { ReactNode } from 'react';

export interface INavItemGroupProps {
  children: ReactNode;
  className?: string;
}

export interface INavItemProps {
  children: ReactNode;
  fullHeight?: boolean;
  className?: string;
}
