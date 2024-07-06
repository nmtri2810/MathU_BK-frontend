import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

interface IBaseAlertDialogProps {
  closeModal: () => void;
  confirmModal: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}

const BaseAlertDialog: React.FC<IBaseAlertDialogProps> = ({
  closeModal,
  confirmModal,
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'Continue'
}) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeModal}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmModal}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BaseAlertDialog;
