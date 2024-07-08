import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { CHECK_QUES_DUP_REQUEST, checkQuesDupFailure, checkQuesDupSuccess } from '../actions/openai';
import { TCheckQuesDupAction, TCheckQuesDupResponse } from '@/interfaces/openai';
import openaiAPI from '@/api/openai';

function* checkQuesDupSaga(action: TCheckQuesDupAction) {
  try {
    const { payload } = action;
    const response: TCheckQuesDupResponse = yield call(openaiAPI.checkQuesDup, payload);
    yield put(checkQuesDupSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(checkQuesDupFailure());
    }
  }
}

function* watchOpenAI() {
  yield takeLatest(CHECK_QUES_DUP_REQUEST, checkQuesDupSaga);
}

export default watchOpenAI;
