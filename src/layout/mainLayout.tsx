import React, { ReactNode } from 'react';
import NavBar from './navbar';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='container'>{children}</div>
    </>
  );
};

export default Layout;
