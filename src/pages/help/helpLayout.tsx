import Layout from '@/layout/mainLayout';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface IHelpLayoutProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

const HelpLayout: React.FC<IHelpLayoutProps> = ({ heading, children, className }) => {
  return (
    <Layout showRightSidebar={false}>
      {/* Breadcrumb will be here */}
      {/* right sidebar for navigate help content */}
      <h1 className='mb-6 border-b-1 pb-4 text-2xl font-bold'>{heading}</h1>
      <div className={cn(className, 'space-y-8')}>{children}</div>
    </Layout>
  );
};

export default HelpLayout;
