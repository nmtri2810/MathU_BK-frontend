import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IAskQuestionCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className: string;
}

const AskQuestionCard: React.FC<IAskQuestionCardProps> = ({ title, description, children, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AskQuestionCard;
