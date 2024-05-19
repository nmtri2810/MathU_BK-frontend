import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  signupSuccess,
  signupFailure,
  LOGIN_GOOGLE_REQUEST,
  loginGoogleSuccess,
  loginGoogleFailure
} from '@/store/actions/auth';
import {
  ILoginAction,
  ILoginGoogleAction,
  ILoginResponse,
  ILogoutAction,
  ILogoutResponse,
  ISignupAction,
  ISignupResponse
} from '@/interfaces/auth';
import authAPI from '@/api/auth';
import { toast } from 'sonner';
import { Path } from '@/constants/enum';
import { AxiosError } from 'axios';

function* loginSaga(action: ILoginAction) {
  try {
    const { payload } = action;
    const response: ILoginResponse = yield call(authAPI.login, payload);
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

function* signupSaga(action: ISignupAction) {
  try {
    const { payload } = action;
    const response: ISignupResponse = yield call(authAPI.signup, payload);
    toast.success(response.message);
    yield put(signupSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(signupFailure());
    }
  }
}

function* loginGoogleSaga(action: ILoginGoogleAction) {
  try {
    const { payload } = action;
    const response: ILoginResponse = yield call(authAPI.loginGoogle, payload);
    yield put(loginGoogleSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(loginGoogleFailure());
    }
  }
}

function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
  yield takeLatest(LOGIN_GOOGLE_REQUEST, loginGoogleSaga);
}

export default watchAuth;
