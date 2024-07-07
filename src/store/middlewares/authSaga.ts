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
  TLoginAction,
  TLoginGoogleAction,
  TLoginResponse,
  TLogoutAction,
  TSignupAction,
  TSignupResponse
} from '@/interfaces/auth';
import authAPI from '@/api/auth';
import { toast } from 'sonner';
import { Path } from '@/constants/enum';
import { AxiosError } from 'axios';
import i18n from '@/locales/i18next';
import { I18nKeys } from '@/locales/i18nKeys';

function* loginSaga(action: TLoginAction) {
  try {
    const { payload } = action;
    const response: TLoginResponse = yield call(authAPI.login, payload);
    yield put(loginSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(loginFailure());
    }
  }
}

function* logoutSaga(action: TLogoutAction) {
  try {
    const { payload } = action;
    yield call(authAPI.logout);
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

function* signupSaga(action: TSignupAction) {
  try {
    const { payload } = action;
    const response: TSignupResponse = yield call(authAPI.signup, payload);
    toast.success(i18n.t(I18nKeys.RESPONSE_API_MSG.AUTH.REGISTER_SUCCESS));
    yield put(signupSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(signupFailure());
    }
  }
}

function* loginGoogleSaga(action: TLoginGoogleAction) {
  try {
    const { payload } = action;
    const response: TLoginResponse = yield call(authAPI.loginGoogle, payload);
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
