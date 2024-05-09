import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from './reduxActions';
import { ILoginDataResponse, ILoginRequestPayload, ILogoutRequestPayload } from '@/interfaces/auth';

const context = 'auth';

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes(`${context}/LOGIN`);
export const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createActionTypes(`${context}/LOGOUT`);

export const loginRequest = createAction<ILoginRequestPayload>(LOGIN_REQUEST);
export const loginSuccess = createAction<ILoginDataResponse>(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const logoutRequest = createAction<ILogoutRequestPayload>(LOGOUT_REQUEST);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);
