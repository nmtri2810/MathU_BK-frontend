import Footer from '@/components/pages/layout/footer';
import NavBar from '@/components/pages/layout/navbar';
import RightSidebar from '@/components/pages/layout/rightSidebar';
import Sidebar from '@/components/pages/layout/sidebar';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
  className?: string;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
  containerClassname?: string;
  showFooter?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({
  children,
  className,
  showLeftSidebar = true,
  containerClassname,
  showRightSidebar = true,
  showFooter = true
}) => {
  return (
    <div className={className}>
      <NavBar />
      <div className={cn('container mt-14', containerClassname, showLeftSidebar && 'flex justify-between')}>
        {showLeftSidebar && <Sidebar />}
        <div
          className={cn('main', showLeftSidebar && 'min-h-[calc(100vh-56px)] w-[calc(100%-10rem)] grow border-l-1 p-6')}
        >
          {children}
        </div>
        {showRightSidebar && <RightSidebar />}
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
