import TiptapInput from '@/components/common/tiptapInput';
import AskQuestionCard from '@/components/pages/questions/askQuestionCard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReactSelect from '@/components/ui/reactSelect';
import { Path } from '@/constants/enum';
import { ITag } from '@/interfaces/tag';
import Layout from '@/layout/mainLayout';
import { listTagRequest } from '@/store/actions/tag';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AskQuestionSchema } from '@/validations/question';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const AskQuestionScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const tagList = useAppSelector((state) => state.tag.list) || [];
  const tagListLoading = useAppSelector((state) => state.tag.listLoading);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: ''
    }
  });

  function onSubmit(data: z.infer<typeof AskQuestionSchema>) {
    console.log('src_pages_questions_askQuestion.tsx#23: ', data);
  }

  const convertedTags = (tags: ITag[]) => {
    if (!tags) return [];

    return tags.map((tag) => ({
      label: tag.name,
      value: String(tag.id)
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error('Please login first');
    }
  }, [navigate, user]);

  useEffect(() => {
    dispatch(listTagRequest());
  }, [dispatch]);

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
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AskQuestionCard
                    className='mt-6'
                    title='Tags'
                    description='Add up to 5 tags to describe what your question is about'
                  >
                    <ReactSelect
                      options={convertedTags(tagList as ITag[])}
                      value={field.value}
                      onChange={field.onChange}
                      isSearchable
                      isMulti
                      isClearable
                      isLoading={tagListLoading}
                      placeholder='e.g. Calculus 1, ...'
                      errorMsg={form.formState.errors.tags?.message}
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
