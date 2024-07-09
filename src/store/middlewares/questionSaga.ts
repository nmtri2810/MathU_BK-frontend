import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_QUESTION_REQUEST,
  DELETE_QUESTION_REQUEST,
  GET_QUESTION_REQUEST,
  LIST_QUESTION_REQUEST,
  UPDATE_QUESTION_REQUEST,
  createQuestionFailure,
  createQuestionSuccess,
  deleteQuestionFailure,
  deleteQuestionSuccess,
  getQuestionFailure,
  getQuestionSuccess,
  listQuestionFailure,
  listQuestionSuccess,
  updateQuestionFailure,
  updateQuestionSuccess
} from '@/store/actions/question';
import {
  TCreateQuestionAction,
  TCreateQuestionResponse,
  TDeleteQuestionAction,
  TDeleteQuestionResponse,
  TGetQuestionAction,
  TGetQuestionResponse,
  TListQuestionAction,
  TListQuestionResponse,
  TUpdateQuestionAction,
  TUpdateQuestionResponse
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

function* deleteQuestionSaga(action: TDeleteQuestionAction) {
  try {
    const { payload } = action;
    const response: TDeleteQuestionResponse = yield call(questionAPI.delete, payload);

    toast.success('Xóa câu hỏi thành công');

    payload.navigate(Path.QUESTIONS);
    yield put(deleteQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(deleteQuestionFailure());
    }
  }
}

function* updateQuestionSaga(action: TUpdateQuestionAction) {
  try {
    const { payload } = action;
    const response: TUpdateQuestionResponse = yield call(questionAPI.update, payload);

    toast.success('Cập nhật câu hỏi thành công');

    // callback
    yield put(updateQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(updateQuestionFailure());
    }
  }
}

function* watchQuestion() {
  yield takeLatest(LIST_QUESTION_REQUEST, listQuestionSaga);
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestionSaga);
  yield takeLatest(GET_QUESTION_REQUEST, getQuestionSaga);
  yield takeLatest(DELETE_QUESTION_REQUEST, deleteQuestionSaga);
  yield takeLatest(UPDATE_QUESTION_REQUEST, updateQuestionSaga);
}

export default watchQuestion;
