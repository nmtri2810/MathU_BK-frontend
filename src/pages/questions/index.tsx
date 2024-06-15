import QuestionCard from '@/components/pages/questions/questionCard';
import { Button } from '@/components/ui/button';
import Layout from '@/layout/mainLayout';
import { listQuestionRequest, updateParams } from '@/store/actions/question';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { getQuestionFilterOptions } from '@/constants';
import ReactSelect, { IReactSelectOptions } from '@/components/ui/reactSelect';
import { SingleValue, MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';
import FullPagination from '@/components/common/fullPagination';
import { useNavigate } from 'react-router-dom';
import { Path } from '@/constants/enum';
import { toast } from 'sonner';

const QuestionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [filterOption, setFilterOption] = useState<SingleValue<IReactSelectOptions>>();
  const [perpageOption, setPerpageOption] = useState<SingleValue<IReactSelectOptions>>();

  const listQuestion = useAppSelector((state) => state.question.list);
  const paginationData = useAppSelector((state) => state.question.meta);
  const { currentPage, perPage, lastPage, total } = paginationData;
  const user = useAppSelector((state) => state.auth.user);

  const onChangeFilter = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    setFilterOption(option as SingleValue<IReactSelectOptions>);
  };

  const onChangePage = (value: number) => {
    dispatch(updateParams({ page: value, perPage: perPage, keyword: '' }));
  };

  const onChangePerpage = (option: SingleValue<IReactSelectOptions> | MultiValue<IReactSelectOptions>) => {
    const selected = option as SingleValue<IReactSelectOptions>;

    setPerpageOption(selected);
    dispatch(updateParams({ page: 1, perPage: Number(selected?.value), keyword: '' }));
  };

  const handleNavigate = () => {
    if (!user) {
      navigate(Path.LOGIN);
      toast.error('Please login first');
      return;
    }

    navigate(Path.ASK_QUESTIONS);
  };

  useEffect(() => {
    dispatch(listQuestionRequest({ page: currentPage, perPage: perPage, keyword: '' }));
  }, [currentPage, dispatch, perPage]);

  useEffect(() => {
    setFilterOption(getQuestionFilterOptions(t)[0]);
  }, [t]);

  return (
    <Layout>
      <div className='mb-7 flex min-h-10 justify-between'>
        <h1 className='text-3xl font-bold'>{t(I18nKeys.QUESTION_SCREEN.ALL_QUESTIONS)}</h1>
        <Button onClick={handleNavigate} className='bg-blue-600 font-normal hover:bg-blue-700'>
          {t(I18nKeys.GLOBAL.ASK_QUESTION)}
        </Button>
      </div>
      <div className='mb-5 flex items-center justify-between'>
        <div className='text-lg'>{t(I18nKeys.COUNT.QUESTION, { count: total })}</div>
        <ReactSelect
          options={getQuestionFilterOptions(t)}
          defaultValue={getQuestionFilterOptions(t)[0]}
          value={filterOption}
          onChange={onChangeFilter}
          className='z-0 w-32 text-sm'
        />
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
    </Layout>
  );
};

export default QuestionScreen;
