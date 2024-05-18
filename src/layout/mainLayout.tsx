import NavBar from '@/components/pages/layout/navbar';
import React, { ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <NavBar />
      <div className='container mt-14'>{children}</div>
    </div>
  );
};

export default Layout;
