import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginFailure, loginSuccess } from '@/store/actions/auth';
import { ILoginAction, ILoginResponse } from '@/interfaces/auth';
import authAPI from '@/api/auth';
import { toast } from 'sonner';

function* loginSaga(action: ILoginAction) {
  try {
    const { payload } = action;
    const response: ILoginResponse = yield call(authAPI.login, payload);
    toast.success(response.message);
    yield put(loginSuccess(response.data));
  } catch (error: unknown) {
    console.log(error);
    toast.error('Error');
    yield put(loginFailure());
  }
}

function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default watchAuth;
