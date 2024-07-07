import QuestionCard from '@/components/pages/questions/questionCard';
import Layout from '@/layout/mainLayout';
import { listQuestionRequest, updateParams } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { IReactSelectOptions } from '@/components/ui/reactSelect';
import { SingleValue, MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import FullPagination from '@/components/common/fullPagination';
import AskQuestionBtn from '@/components/pages/questions/askQuestionBtn';
import PageLoading from '@/components/common/pageLoading';
import BaseAlert from '@/components/common/baseAlert';
import { Info } from 'lucide-react';

const QuestionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [perpageOption, setPerpageOption] = useState<SingleValue<IReactSelectOptions>>();

  const listQuestion = useAppSelector((state) => state.question.list);
  const listQuestionLoading = useAppSelector((state) => state.question.listLoading);
  const paginationData = useAppSelector((state) => state.question.meta);
  const { currentPage, perPage, lastPage, total } = paginationData;
  const searchKeyword = useAppSelector((state) => state.question.keyword);

  const onChangePage = (value: number) => {
    dispatch(updateParams({ page: value, perPage: perPage, keyword: searchKeyword }));
  };

  const onChangePerpage = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    const selected = option as SingleValue<IReactSelectOptions>;

    setPerpageOption(selected);
    dispatch(updateParams({ page: 1, perPage: Number(selected?.value), keyword: searchKeyword }));
  };

  useEffect(() => {
    dispatch(listQuestionRequest({ page: currentPage, perPage: perPage, keyword: searchKeyword }));
  }, [currentPage, dispatch, perPage, searchKeyword]);

  // Bad practice
  useEffect(() => {
    setPerpageOption({ label: String(perPage), value: String(perPage) });
  }, [perPage, t]);

  return (
    <Layout>
      {listQuestionLoading ? (
        <PageLoading />
      ) : (
        <>
          <div className='mb-7 flex min-h-10 justify-between'>
            <h1 className='text-3xl font-bold'>{t(I18nKeys.QUESTION_SCREEN.ALL_QUESTIONS)}</h1>
            <AskQuestionBtn />
          </div>
          {listQuestion?.length === 0 ? (
            <BaseAlert
              variant='info'
              title={t(I18nKeys.DETAIL_QUESTION_SCREEN.ALERT_NO_QUESTION_TITLE)}
              description={t(I18nKeys.DETAIL_QUESTION_SCREEN.ALERT_NO_QUESTION_DESCRIPTION)}
              className='flex items-center gap-4'
              icon={<Info size={24} strokeWidth={1.5} />}
            />
          ) : (
            <>
              <div className='mb-5 flex items-center justify-between'>
                <div className='text-lg italic'>{t(I18nKeys.COUNT.QUESTION, { count: total })}</div>
                {/* temp */}
                {/* <SortOption /> */}
              </div>
              <div>
                {listQuestion?.map((question, index) => (
                  <QuestionCard key={question.id} question={question} isLast={index === listQuestion.length - 1} />
                ))}
              </div>
              <FullPagination
                currentPage={currentPage}
                totalPages={lastPage}
                onChangePage={onChangePage}
                perpageValue={perpageOption}
                onChangePerpage={onChangePerpage}
              />
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default QuestionScreen;
