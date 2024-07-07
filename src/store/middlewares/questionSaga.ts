import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_QUESTION_REQUEST,
  GET_QUESTION_REQUEST,
  LIST_QUESTION_REQUEST,
  createQuestionFailure,
  createQuestionSuccess,
  getQuestionFailure,
  getQuestionSuccess,
  listQuestionFailure,
  listQuestionSuccess
} from '@/store/actions/question';
import {
  TCreateQuestionAction,
  TCreateQuestionResponse,
  TGetQuestionAction,
  TGetQuestionResponse,
  TListQuestionAction,
  TListQuestionResponse
} from '@/interfaces/question';
import questionAPI from '@/api/question';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Path } from '@/constants/enum';
import { generatePath } from 'react-router-dom';
import { formatTitleForURL } from '@/lib/utils';
import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';

function* listQuestionSaga(action: TListQuestionAction) {
  try {
    const { payload } = action;
    const response: TListQuestionResponse = yield call(questionAPI.list, payload);
    yield put(listQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(listQuestionFailure());
    }
  }
}

function* createQuestionSaga(action: TCreateQuestionAction) {
  try {
    const { navigate, ...payload } = action.payload;
    const response: TCreateQuestionResponse = yield call(questionAPI.create, payload);

    toast.success(i18n.t(I18nKeys.RESPONSE_API_MSG.QUESTION.CREATE_SUCCESS));

    const path = generatePath(Path.DETAIL_QUESTIONS, {
      id: String(response.data.id),
      title: formatTitleForURL(response.data.title)
    });
    navigate(path, { replace: true });

    yield put(createQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(createQuestionFailure());
    }
  }
}

function* getQuestionSaga(action: TGetQuestionAction) {
  try {
    const { payload } = action;
    const response: TGetQuestionResponse = yield call(questionAPI.get, payload);
    yield put(getQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(getQuestionFailure());
    }
  }
}

function* watchQuestion() {
  yield takeLatest(LIST_QUESTION_REQUEST, listQuestionSaga);
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestionSaga);
  yield takeLatest(GET_QUESTION_REQUEST, getQuestionSaga);
}

export default watchQuestion;
