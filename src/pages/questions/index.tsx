import QuestionCard from '@/components/pages/questions/questionCard';
import { Button } from '@/components/ui/button';
import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import { listQuestionRequest } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';

const QuestionScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const listQuestion = useAppSelector((state) => state.question.list);
  // const paginationData = useAppSelector((state) => state.question.meta); // temp

  useEffect(() => {
    dispatch(listQuestionRequest({ page: 1, perPage: 1000, keyword: '' }));
  }, [dispatch]);

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>All Questions</h1>
        <Button className='bg-blue-600 font-normal hover:bg-blue-700'>Ask Question</Button>
      </div>

      <UnlockAccess request={[Role.Guest]}>
        <p>This is for guest</p>
      </UnlockAccess>

      <UnlockAccess request={[Role.User]}>
        <div>{listQuestion?.map((question) => <QuestionCard key={question.id} question={question} />)}</div>
      </UnlockAccess>

      <UnlockAccess request={[Role.Moderator]}>
        <p>This is for mod</p>
      </UnlockAccess>
    </Layout>
  );
};

export default QuestionScreen;
