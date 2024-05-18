import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess
} from '@/store/actions/auth';
import { ILoginAction, ILoginResponse, ILogoutAction, ILogoutResponse } from '@/interfaces/auth';
import authAPI from '@/api/auth';
import { toast } from 'sonner';
import { Path } from '@/constants/enum';
import { AxiosError } from 'axios';

function* loginSaga(action: ILoginAction) {
  try {
    const { payload } = action;
    const response: ILoginResponse = yield call(authAPI.login, payload);
    toast.success(response.message);
    yield put(loginSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(loginFailure());
    }
  }
}

function* logoutSaga(action: ILogoutAction) {
  try {
    const { payload } = action;
    const response: ILogoutResponse = yield call(authAPI.logout);
    toast.success(response.message);
    yield put(logoutSuccess());
    payload.navigate(Path.HOME_CLIENT);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(logoutFailure());
    }
  }
}

function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export default watchAuth;
