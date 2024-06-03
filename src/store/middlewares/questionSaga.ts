import { call, put, takeLatest } from 'redux-saga/effects';
import { LIST_QUESTION_REQUEST, listQuestionFailure, listQuestionSuccess } from '@/store/actions/question';
import { IListQuestionAction, IListQuestionResponse } from '@/interfaces/question';
import questionAPI from '@/api/question';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function* listQuestionSaga(action: IListQuestionAction) {
  try {
    const { payload } = action;
    const response: IListQuestionResponse = yield call(questionAPI.list, payload);
    yield put(listQuestionSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(listQuestionFailure());
    }
  }
}

function* watchQuestion() {
  yield takeLatest(LIST_QUESTION_REQUEST, listQuestionSaga);
}

export default watchQuestion;
