import QuestionCard from '@/components/pages/questions/questionCard';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/mainLayout';
import { listQuestionRequest } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { QuestionFilterOptions } from '@/constants';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { SingleValue, MultiValue } from 'react-select';

const QuestionScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<SingleValue<IReactSelectOptions>>(QuestionFilterOptions[0]);

  const listQuestion = useAppSelector((state) => state.question.list);
  // const paginationData = useAppSelector((state) => state.question.meta); // temp

  useEffect(() => {
    dispatch(listQuestionRequest({ page: 1, perPage: 1000, keyword: '' }));
  }, [dispatch]);

  const handleChange = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    setSelectedOption(option as SingleValue<IReactSelectOptions>);
  };

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>All Questions</h1>
        <Button className='bg-blue-600 font-normal hover:bg-blue-700'>Ask Question</Button>
      </div>
      <div className='mb-5 flex items-center justify-between'>
        <div className='text-lg'>{`${listQuestion?.length} questions`}</div>
        <ReactSelect
          options={QuestionFilterOptions}
          value={selectedOption}
          onChange={handleChange}
          className='z-0 w-32 text-sm'
        />
      </div>
      <div>{listQuestion?.map((question) => <QuestionCard key={question.id} question={question} />)}</div>
    </Layout>
  );
};

export default QuestionScreen;
