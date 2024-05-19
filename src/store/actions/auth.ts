import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from './reduxActions';
import {
  ILoginDataResponse,
  ILoginGoogleRequestPayload,
  ILoginRequestPayload,
  ILogoutRequestPayload,
  ISignupRequestPayload
} from '@/interfaces/auth';

const context = 'auth';

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes(`${context}/LOGIN`);
export const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createActionTypes(`${context}/LOGOUT`);
export const [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createActionTypes(`${context}/SIGNUP`);
export const [LOGIN_GOOGLE_REQUEST, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_FAILURE] = createActionTypes(
  `${context}/LOGIN_GOOGLE`
);

export const loginRequest = createAction<ILoginRequestPayload>(LOGIN_REQUEST);
export const loginSuccess = createAction<ILoginDataResponse>(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const logoutRequest = createAction<ILogoutRequestPayload>(LOGOUT_REQUEST);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const signupRequest = createAction<ISignupRequestPayload>(SIGNUP_REQUEST);
export const signupSuccess = createAction<ILoginDataResponse>(SIGNUP_SUCCESS);
export const signupFailure = createAction(SIGNUP_FAILURE);

export const loginGoogleRequest = createAction<ILoginGoogleRequestPayload>(LOGIN_GOOGLE_REQUEST);
export const loginGoogleSuccess = createAction<ILoginDataResponse>(LOGIN_GOOGLE_SUCCESS);
export const loginGoogleFailure = createAction(LOGIN_GOOGLE_FAILURE);
