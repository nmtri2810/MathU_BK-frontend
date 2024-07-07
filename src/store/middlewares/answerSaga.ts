import answerAPI from '@/api/answer';
import {
  TCreateAnswerAction,
  TCreateAnswerResponse,
  TUpdateAnswerAction,
  TUpdateAnswerResponse
} from '@/interfaces/answer';
import {
  CREATE_ANSWER_REQUEST,
  DELETE_ANSWER_REQUEST,
  UPDATE_ANSWER_REQUEST,
  createAnswerFailure,
  createAnswerSuccess,
  updateAnswerFailure,
  updateAnswerSuccess
} from '@/store/actions/answer';
import { AxiosError } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'sonner';
import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';

function* createAnswerSaga(action: TCreateAnswerAction) {
  try {
    const { callback, ...payload } = action.payload;
    const response: TCreateAnswerResponse = yield call(answerAPI.create, payload);

    callback?.();

    toast.success(i18n.t(I18nKeys.RESPONSE_API_MSG.ANSWER.CREATE_SUCCESS));
    yield put(createAnswerSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(createAnswerFailure());
    }
  }
}

function* updateAnswerSaga(action: TUpdateAnswerAction) {
  try {
    const { payload } = action;
    const response: TUpdateAnswerResponse = yield call(answerAPI.update, payload);
    yield put(updateAnswerSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(updateAnswerFailure());
    }
  }
}

function* deleteAnswerSaga() {}

function* watchAnswer() {
  yield takeLatest(CREATE_ANSWER_REQUEST, createAnswerSaga);
  yield takeLatest(UPDATE_ANSWER_REQUEST, updateAnswerSaga);
  yield takeLatest(DELETE_ANSWER_REQUEST, deleteAnswerSaga);
}

export default watchAnswer;
