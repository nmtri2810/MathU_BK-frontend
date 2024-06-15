import NavBar from '@/components/pages/layout/navbar';
import Sidebar from '@/components/pages/layout/sidebar';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
  className?: string;
  showLeftSidebar?: boolean;
  containerClassname?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, className, showLeftSidebar = true, containerClassname }) => {
  return (
    <div className={className}>
      <NavBar />
      <div className={cn('container mt-14', containerClassname, showLeftSidebar && 'flex justify-between')}>
        {showLeftSidebar && <Sidebar />}
        <div className={cn('main', showLeftSidebar && 'min-h-[calc(100vh-56px)] w-[calc(100%-10rem)] border-l-1 p-6')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
