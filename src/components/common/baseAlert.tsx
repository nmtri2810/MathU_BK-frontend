import React, { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface IBaseAlertProps {
  variant: 'default' | 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

const BaseAlert: React.FC<IBaseAlertProps> = ({ variant, title, description, icon, className }) => {
  return (
    <Alert variant={variant} className={className}>
      <div>{icon}</div>
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default BaseAlert;
