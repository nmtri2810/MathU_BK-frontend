import TiptapInput from '@/components/common/tiptapInput';
import AskQuestionCard from '@/components/pages/questions/askQuestionCard';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReactSelect from '@/components/ui/reactSelect';
import { Path } from '@/constants/enum';
import { ITag } from '@/interfaces/tag';
import Layout from '@/layout/mainLayout';
import { formatTitleForURL } from '@/lib/utils';
import { I18nKeys } from '@/locales/i18nKeys';
import { checkQuesDupRequest } from '@/store/actions/openai';
import { createQuestionRequest } from '@/store/actions/question';
import { listTagRequest } from '@/store/actions/tag';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AskQuestionSchema } from '@/validations/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@nextui-org/spinner';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const AskQuestionScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);
  const tagList = useAppSelector((state) => state.tag.list) || [];
  const tagListLoading = useAppSelector((state) => state.tag.listLoading);

  const AIResponse = useAppSelector((state) => state.openai.data);
  const AIResArr: { id: number; title: string }[] = AIResponse ? JSON.parse(AIResponse?.content) : [];
  const isAIResponseLoading = useAppSelector((state) => state.openai.loading);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: ''
    }
  });

  function onSubmit(data: z.infer<typeof AskQuestionSchema>) {
    if (!user) return;

    const tagNumArr = data.tags.map((tag) => Number(tag.value));
    const requestData = {
      title: data.title,
      description: data.body,
      user_id: user?.id,
      tag_ids: tagNumArr
    };

    if (AIResponse) {
      dispatch(createQuestionRequest({ ...requestData, navigate }));
    } else {
      dispatch(checkQuesDupRequest({ messages: [{ role: 'user', content: data.title }] }));
    }
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
      toast.error(t(I18nKeys.GLOBAL.LOGIN_FIRST));
    }
  }, [navigate, t, user]);

  useEffect(() => {
    dispatch(listTagRequest());
  }, [dispatch]);

  return (
    <Layout>
      <h1 className='text-3xl font-bold'>{t(I18nKeys.GLOBAL.ASK_QUESTION)}</h1>
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
                    title={t(I18nKeys.GLOBAL.TITLE)}
                    description={t(I18nKeys.ASK_QUESTION_SCREEN.TITLE_DESCRIPTION)}
                  >
                    <Input
                      placeholder={t(I18nKeys.ASK_QUESTION_SCREEN.TITLE_PLACEHOLDER)}
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
                    title={t(I18nKeys.ASK_QUESTION_SCREEN.BODY)}
                    description={t(I18nKeys.ASK_QUESTION_SCREEN.BODY_DESCRIPTION)}
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
                    title={t(I18nKeys.GLOBAL.TAGS)}
                    description={t(I18nKeys.ASK_QUESTION_SCREEN.TAG_DESCRIPTION)}
                  >
                    <ReactSelect
                      options={convertedTags(tagList as ITag[])}
                      value={field.value}
                      onChange={field.onChange}
                      isSearchable
                      isMulti
                      isClearable
                      isLoading={tagListLoading}
                      placeholder={t(I18nKeys.ASK_QUESTION_SCREEN.TAG_PLACEHOLDER)}
                      errorMsg={form.formState.errors.tags?.message}
                    />
                    <FormMessage className='mt-2' />
                  </AskQuestionCard>
                </FormControl>
              </FormItem>
            )}
          />
          <AskQuestionCard
            className='mt-6'
            title={t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.CARD_TITLE)}
            description={t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.CARD_DESCRIPTION)}
          >
            <div className='-mt-2 space-y-2'>
              {isAIResponseLoading && (
                <div className='flex items-center justify-center'>
                  <Spinner label={t(I18nKeys.GLOBAL.LOADING)} color='default' labelColor='foreground' size='lg' />
                </div>
              )}

              {AIResponse && AIResArr.length === 0 && t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.AI_NOT_FOUNG)}

              {AIResponse && AIResArr.length !== 0 && (
                <>
                  <div>{t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.AI_FOUND1, { count: AIResArr.length })}</div>
                  <ul className='list-disc pl-6'>
                    {AIResArr.map((data, index) => (
                      <li key={index}>
                        <Link
                          target='_blank'
                          className='block w-fit text-blue-600 hover:text-blue-700 hover:underline'
                          to={generatePath(Path.DETAIL_QUESTIONS, {
                            id: String(data.id),
                            title: formatTitleForURL(data.title)
                          })}
                        >
                          {data.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div>{t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.AI_FOUND2)}</div>
                </>
              )}
            </div>
          </AskQuestionCard>
          {AIResponse ? (
            <Button
              type='submit'
              className='bg-blue-600 font-normal hover:bg-blue-700'
              onClick={form.handleSubmit(onSubmit)}
            >
              {t(I18nKeys.ASK_QUESTION_SCREEN.SUBMIT)}
            </Button>
          ) : (
            <Button
              type='submit'
              className='bg-blue-600 font-normal hover:bg-blue-700'
              onClick={form.handleSubmit(onSubmit)}
              disabled={isAIResponseLoading}
            >
              {t(I18nKeys.ASK_QUESTION_SCREEN.CHECK_DUPLICATE.SUBMIT)}
            </Button>
          )}
        </div>
      </Form>
    </Layout>
  );
};

export default AskQuestionScreen;
