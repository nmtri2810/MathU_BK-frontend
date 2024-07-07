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
import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';

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
  cancelText = i18n.t(I18nKeys.GLOBAL.CANCEL),
  confirmText = i18n.t(I18nKeys.GLOBAL.CONTINUE)
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
