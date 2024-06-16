import TiptapInput from '@/components/common/tiptapInput';
import AskQuestionCard from '@/components/pages/questions/askQuestionCard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Path } from '@/constants/enum';
import Layout from '@/layout/mainLayout';
import { useAppSelector } from '@/store/hooks';
import { AskQuestionSchema } from '@/validations/question';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const AskQuestionScreen: React.FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: ''
    }
  });

  function onSubmit(data: z.infer<typeof AskQuestionSchema>) {
    console.log('src_pages_questions_askQuestion.tsx#23: ', data);
  }

  useEffect(() => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error('Please login first');
    }
  }, [navigate, user]);

  return (
    <Layout>
      <h1 className='text-3xl font-bold'>Ask a public question</h1>
      <Form {...form}>
        <div className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AskQuestionCard
                    className='mt-6'
                    title='Title'
                    description="Be specific and imagine you're asking a question to another person"
                  >
                    <Input
                      placeholder="What's your math question? Be specific"
                      type='text'
                      {...field}
                      errorMsg={form.formState.errors.title?.message}
                    />
                    <FormMessage className='mt-2' />
                  </AskQuestionCard>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AskQuestionCard
                    className='mt-6'
                    title='Body'
                    description='Include all the information someone would need to answer your question'
                  >
                    <TiptapInput
                      value={field.value}
                      onChange={field.onChange}
                      errorMsg={form.formState.errors.body?.message}
                    />
                    <FormMessage className='mt-2' />
                  </AskQuestionCard>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
            Post your question
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default AskQuestionScreen;
