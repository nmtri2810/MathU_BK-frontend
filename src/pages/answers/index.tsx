import TiptapInput from '@/components/common/tiptapInput';
import AnswerList from '@/components/pages/answers/answerList';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Path } from '@/constants/enum';
import { I18nKeys } from '@/locales/i18nKeys';
import { createAnswerRequest } from '@/store/actions/answer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CreateAnswerSchema } from '@/validations/answer';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { z } from 'zod';

interface IAnswerSectionProps {
  callback: () => void;
}

const AnswerSection: React.FC<IAnswerSectionProps> = ({ callback }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const question = useAppSelector((state) => state.question.one);
  const user = useAppSelector((state) => state.auth.user);

  const form = useForm<z.infer<typeof CreateAnswerSchema>>({
    resolver: zodResolver(CreateAnswerSchema),
    defaultValues: {
      answer: ''
    }
  });

  function onSubmit(data: z.infer<typeof CreateAnswerSchema>) {
    if (!user || !question) return;

    const requestData = {
      content: data.answer,
      question_id: question.id,
      user_id: user.id
    };

    dispatch(createAnswerRequest({ ...requestData, callback }));
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between'>
        {question?.answers.length !== 0 && (
          <>
            <div className='text-lg italic'>{t(I18nKeys.COUNT.ANSWER, { count: question?._count.answers })}</div>
            {/* <SortOption /> */}
          </>
        )}
      </div>
      <AnswerList answers={question?.answers} user={user} question={question} callback={callback} />
      <div className='mt-4 space-y-8'>
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <div className='text-lg'>
              {t(I18nKeys.DETAIL_QUESTION_SCREEN.PLEASE_LOGIN)} -{' '}
              <Link className='text-blue-600 hover:underline' to={Path.LOGIN}>
                {t(I18nKeys.DETAIL_QUESTION_SCREEN.LOGIN_NOW)}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerSection;
