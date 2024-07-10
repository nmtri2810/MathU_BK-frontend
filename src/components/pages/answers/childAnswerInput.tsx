import TiptapInput from '@/components/common/tiptapInput';
import { Button } from '@/components/ui/button';
import { IAnswer } from '@/interfaces/answer';
import { cn } from '@/lib/utils';
import { I18nKeys } from '@/locales/i18nKeys';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IChildAnswerInputProps {
  handleClose: () => void;
  handleSubmit: (id: number) => void;
  text: string;
  setText: (text: string) => void;
  showWarning: boolean;
  answer: IAnswer;
  className?: string;
  btnSubmit: string;
}

const ChildAnswerInput: React.FC<IChildAnswerInputProps> = ({
  handleClose,
  handleSubmit,
  text,
  setText,
  showWarning,
  answer,
  className,
  btnSubmit
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn(className, 'space-y-3')}>
      <span className={cn('text-sm text-gray-500', showWarning ? 'text-destructive' : '')}>
        {t(I18nKeys.ANSWER_SECTION.COMMENT_DESC)}
      </span>
      <TiptapInput value={text} onChange={setText} className='max-w-[769px]' />
      <div className='flex justify-end gap-3'>
        <Button size='sm' variant='outline' onClick={() => handleClose()}>
          {t(I18nKeys.GLOBAL.CLOSE)}
        </Button>
        <Button size='sm' className='bg-blue-600 font-normal hover:bg-blue-700' onClick={() => handleSubmit(answer.id)}>
          {btnSubmit}
        </Button>
      </div>
    </div>
  );
};

export default ChildAnswerInput;
