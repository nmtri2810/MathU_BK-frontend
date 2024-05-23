import NavBar from '@/components/pages/layout/navbar';
import Sidebar from '@/components/pages/layout/sidebar';
import { Path } from '@/constants/enum';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ILayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, className }) => {
  const location = useLocation();
  const noSidebarPaths = [Path.LOGIN, Path.SIGN_UP];
  const showSidebar = !noSidebarPaths.includes(location.pathname as Path);

  return (
    <div className={className}>
      <NavBar />
      <div className={cn('container mt-14', showSidebar && 'flex justify-between')}>
        {showSidebar && <Sidebar />}
        <div className={cn('main', showSidebar && 'min-h-[calc(100vh-56px)] w-[calc(100%-10rem)] border-l-1 p-6')}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
