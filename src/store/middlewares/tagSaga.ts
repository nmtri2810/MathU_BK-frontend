import { call, put, takeLatest } from 'redux-saga/effects';
import { LIST_TAG_REQUEST, listTagFailure, listTagSuccess } from '@/store/actions/tag';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import tagAPI from '@/api/tag';
import { IListTagResponse } from '@/interfaces/tag';

function* listTagSaga() {
  try {
    const response: IListTagResponse = yield call(tagAPI.list);
    yield put(listTagSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(listTagFailure());
    }
  }
}

function* watchTag() {
  yield takeLatest(LIST_TAG_REQUEST, listTagSaga);
}

export default watchTag;
