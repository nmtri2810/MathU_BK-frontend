import AskQuestionBtn from '@/components/pages/questions/askQuestionBtn';
import PageLoading from '@/components/common/pageLoading';
import TagGroup from '@/components/common/tagGroup';
import UserData from '@/components/common/userData';
import VotesBtnGroup from '@/components/pages/questions/votesBtnGroup';
import Layout from '@/layout/mainLayout';
import { formatTimeFromNow } from '@/lib/utils';
import { getQuestionRequest } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UtilsLinkGroup from '@/components/pages/questions/utilsLinkGroup';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { I18nKeys } from '@/locales/i18nKeys';

const DetailQuestionScreen: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const question = useAppSelector((state) => state.question.one);
  const questionLoading = useAppSelector((state) => state.question.oneLoading);

  const questionTimeData = [
    {
      text: t(I18nKeys.DETAIL_QUESTION_SCREEN.ASKED),
      time: formatTimeFromNow(question?.created_at)
    },
    {
      text: t(I18nKeys.DETAIL_QUESTION_SCREEN.MODIFIED),
      time: formatTimeFromNow(question?.updated_at)
    },
    {
      text: t(I18nKeys.DETAIL_QUESTION_SCREEN.VIEWED),
      time: '5 times'
    }
  ];

  useEffect(() => {
    dispatch(getQuestionRequest({ id: Number(id) }));
  }, [dispatch, id]);

  return (
    <Layout>
      {questionLoading ? (
        <PageLoading />
      ) : (
        <>
          <div>
            <div className='flex min-h-10 justify-between'>
              <h1 className='text-2xl'>{question?.title}</h1>
              <AskQuestionBtn />
            </div>
            <div className='mt-2 space-x-4 border-b-1 pb-5 text-sm'>
              {questionTimeData.map((data, index) => (
                <span key={index}>
                  {data.text} <span className='italic'>{data.time}</span>
                </span>
              ))}
            </div>
          </div>
          <div className='mt-5 flex gap-6'>
            <VotesBtnGroup />
            <div className='w-full grow space-y-10'>
              <div>
                <SanitizeHTML html={question?.description as string} />
                <TagGroup className='mt-10' tags={question?.tags} />
              </div>
              <div className='flex items-center justify-between'>
                <UtilsLinkGroup />
                <UserData
                  className='rounded-md bg-[#edf5fd] p-2.5'
                  username={'user.username'}
                  reputation={0}
                  createdAt={question?.created_at}
                  isInList={false}
                />
              </div>
              <div>{/* comment here */}</div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DetailQuestionScreen;
