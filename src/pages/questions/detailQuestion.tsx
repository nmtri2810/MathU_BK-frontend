import AskQuestionBtn from '@/components/pages/questions/askQuestionBtn';
import PageLoading from '@/components/common/pageLoading';
import TagGroup from '@/components/common/tagGroup';
import UserData from '@/components/common/userData';
import VotesBtnGroup from '@/components/pages/questions/votesBtnGroup';
import Layout from '@/layout/mainLayout';
import { formatTimeFromNow } from '@/lib/utils';
import { getQuestionRequest } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import UtilsLinkGroup from '@/components/pages/questions/utilsLinkGroup';
import SanitizeHTML from '@/components/common/sanitizeHTML';
import { I18nKeys } from '@/locales/i18nKeys';
import AnswerSection from '@/pages/answers';
import dayjs from 'dayjs';
import { IVote } from '@/interfaces/vote';

const DetailQuestionScreen: React.FC = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);
  const dispatch = useAppDispatch();

  const question = useAppSelector((state) => state.question.one);
  const questionLoading = useAppSelector((state) => state.question.oneLoading);
  const user = useAppSelector((state) => state.auth.user);

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
      time: t(I18nKeys.COUNT.TIME_COUNT, { count: 0 })
      // temp
    }
  ];

  const fetchData = useCallback(() => {
    dispatch(getQuestionRequest({ id: Number(id) }));
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <VotesBtnGroup
              id={question?.id as number}
              type='question'
              votes={question?.votes as IVote[]}
              callback={() => fetchData()}
            />
            <div className='w-full grow space-y-10'>
              <div>
                <SanitizeHTML html={question?.description as string} />
                <TagGroup className='mt-10' tags={question?.tags} />
              </div>
              <div className='flex items-center justify-between'>
                <UtilsLinkGroup user={user} question={question} isInQuestion={true} />
                <UserData
                  className='rounded-md bg-[#edf5fd] p-2.5'
                  username={question?.user.username}
                  reputation={question?.user.reputation}
                  createdAt={question?.created_at}
                  isInList={false}
                />
              </div>
            </div>
          </div>
          <AnswerSection callback={() => fetchData()} />
        </>
      )}
    </Layout>
  );
};

export default DetailQuestionScreen;
