import QuestionCard from '@/components/pages/questions/questionCard';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/mainLayout';
import { listQuestionRequest } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { getQuestionFilterOptions } from '@/constants';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { SingleValue, MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const QuestionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<SingleValue<IReactSelectOptions>>();

  const listQuestion = useAppSelector((state) => state.question.list);
  // const paginationData = useAppSelector((state) => state.question.meta); // temp

  const handleChangeFilter = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    setSelectedOption(option as SingleValue<IReactSelectOptions>);
  };

  useEffect(() => {
    dispatch(listQuestionRequest({ page: 1, perPage: 1000, keyword: '' }));
  }, [dispatch]);

  useEffect(() => {
    setSelectedOption(getQuestionFilterOptions(t)[0]);
  }, [t]);

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>{t(I18nKeys.QUESTION_SCREEN.ALL_QUESTIONS)}</h1>
        <Button className='bg-blue-600 font-normal hover:bg-blue-700'>{t(I18nKeys.GLOBAL.ASK_QUESTION)}</Button>
      </div>
      <div className='mb-5 flex items-center justify-between'>
        <div className='text-lg'>{t(I18nKeys.COUNT.QUESTION, { count: listQuestion?.length })}</div>
        <ReactSelect
          options={getQuestionFilterOptions(t)}
          defaultValue={getQuestionFilterOptions(t)[0]}
          value={selectedOption}
          onChange={handleChangeFilter}
          className='z-0 w-32 text-sm'
        />
      </div>
      <div>{listQuestion?.map((question) => <QuestionCard key={question.id} question={question} />)}</div>
    </Layout>
  );
};

export default QuestionScreen;
