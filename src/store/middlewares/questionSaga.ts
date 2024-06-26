import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_QUESTION_REQUEST,
  LIST_QUESTION_REQUEST,
  createQuestionFailure,
  createQuestionSuccess,
  listQuestionFailure,
  listQuestionSuccess
} from '@/store/actions/question';
import {
  TCreateQuestionAction,
  TCreateQuestionResponse,
  TListQuestionAction,
  TListQuestionResponse
} from '@/interfaces/question';
import questionAPI from '@/api/question';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Path } from '@/constants/enum';

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

    toast.success(response.message);
    navigate(Path.QUESTIONS); // temp

    yield put(createQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(createQuestionFailure());
    }
  }
}

function* watchQuestion() {
  yield takeLatest(LIST_QUESTION_REQUEST, listQuestionSaga);
  yield takeLatest(CREATE_QUESTION_REQUEST, createQuestionSaga);
}

export default watchQuestion;
