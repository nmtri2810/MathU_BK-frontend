import TiptapInput from '@/components/common/tiptapInput';
import AnswerList from '@/components/pages/answers/answerList';
import SortOption from '@/components/pages/questions/sortOption';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { MessagesValidate } from '@/constants';
import { I18nKeys } from '@/locales/i18nKeys';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const AnswerSection: React.FC = () => {
  const { t } = useTranslation();

  const question = useAppSelector((state) => state.question.one);

  const CreateAnswerSchema = z.object({
    answer: z.string().min(15, {
      message: MessagesValidate.isRequired('Answer')
    })
  });

  const form = useForm<z.infer<typeof CreateAnswerSchema>>({
    resolver: zodResolver(CreateAnswerSchema),
    defaultValues: {
      answer: ''
    }
  });

  function onSubmit(data: z.infer<typeof CreateAnswerSchema>) {
    console.log('src_pages_answers_index.tsx#34: ', data);
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between'>
        <div className='text-lg'>{t(I18nKeys.COUNT.ANSWER, { count: question?._count.answers })}</div>
        <SortOption />
      </div>
      <AnswerList answers={question?.answers} />
      <div className='mt-4 space-y-8'>
        <div className='text-lg'>{t(I18nKeys.DETAIL_QUESTION_SCREEN.YOUR_ANSWER)}</div>
        <Form {...form}>
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <TiptapInput
                      value={field.value}
                      onChange={field.onChange}
                      errorMsg={form.formState.errors.answer?.message}
                    />
                    <FormMessage className='mt-2' />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-blue-600 font-normal hover:bg-blue-700'
            onClick={form.handleSubmit(onSubmit)}
          >
            {t(I18nKeys.DETAIL_QUESTION_SCREEN.SUBMIT_ANSWER)}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AnswerSection;
