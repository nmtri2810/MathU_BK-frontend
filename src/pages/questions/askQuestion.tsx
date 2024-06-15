import AskQuestionCard from '@/components/pages/questions/askQuestionCard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MessagesValidate } from '@/constants';
import { Path } from '@/constants/enum';
import Layout from '@/layout/mainLayout';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Title')
    })
    .max(150, {
      message: MessagesValidate.maxLength('Title', 150)
    }),
  body: z
    .string()
    .min(1, {
      message: MessagesValidate.isRequired('Body')
    })
    .max(300, {
      message: MessagesValidate.maxLength('Body', 300)
    })
});

const AskQuestionScreen: React.FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
              <AskQuestionCard
                className='mt-6'
                title='Title'
                description="Be specific and imagine you're asking a question to another person."
              >
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='e.g. bla bla bla'
                      type='text'
                      {...field}
                      errorMsg={form.formState.errors.title?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </AskQuestionCard>
            )}
          />
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <AskQuestionCard
                className='mt-6'
                title='What are the details of your problem?'
                description='Introduce the problem and expand on what you put in the title. Minimum 20 characters.'
              >
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='e.g. bla bla bla'
                      type='text'
                      {...field}
                      errorMsg={form.formState.errors.body?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </AskQuestionCard>
            )}
          />
          <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default AskQuestionScreen;
