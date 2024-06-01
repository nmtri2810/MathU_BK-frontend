import QuestionCard from '@/components/pages/questions/questionCard';
import { Button } from '@/components/ui/button';
import { Role } from '@/constants';
import Layout from '@/layout/mainLayout';
import { UnlockAccess } from '@/routers/rolebasedRoute';
import React from 'react';

const QuestionScreen: React.FC = () => {
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
        <div>
          <QuestionCard
            title='Java Apache Beam, mock external Clients initialized in @Setup method of DoFn with Constructors variables?'
            excerpt='Apache Beam recommends to use Fakes instead of Mocks, since Mocks cannot serialize over the pipeline. I am
            writing unit tests for older code, where the class is using Apache Beam calling other'
          />
          <QuestionCard
            title='Java Apache Beam, mock external Clients initialized in @Setup method of DoFn with Constructors variables?'
            excerpt='Apache Beam recommends to use Fakes instead of Mocks, since Mocks cannot serialize over the pipeline. I am
            writing unit tests for older code, where the class is using Apache Beam calling other'
          />
          <QuestionCard
            title='Java Apache Beam, mock external Clients initialized in @Setup method of DoFn with Constructors variables?'
            excerpt='Apache Beam recommends to use Fakes instead of Mocks, since Mocks cannot serialize over the pipeline. I am
            writing unit tests for older code, where the class is using Apache Beam calling other'
          />
          <QuestionCard
            title='Java Apache Beam, mock external Clients initialized in @Setup method of DoFn with Constructors variables?'
            excerpt='Apache Beam recommends to use Fakes instead of Mocks, since Mocks cannot serialize over the pipeline. I am
            writing unit tests for older code, where the class is using Apache Beam calling other'
          />
          <QuestionCard
            title='Java Apache Beam, mock external Clients initialized in @Setup method of DoFn with Constructors variables?'
            excerpt='Apache Beam recommends to use Fakes instead of Mocks, since Mocks cannot serialize over the pipeline. I am
            writing unit tests for older code, where the class is using Apache Beam calling other'
          />
        </div>
      </UnlockAccess>

      <UnlockAccess request={[Role.Moderator]}>
        <p>This is for mod</p>
      </UnlockAccess>
    </Layout>
  );
};

export default QuestionScreen;
