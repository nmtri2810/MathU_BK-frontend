import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from './reduxActions';
import { ILoginDataResponse, ILoginRequestPayload } from '@/interfaces/auth';

const context = 'auth';

export const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes(`${context}/LOGIN`);

export const loginRequest = createAction<ILoginRequestPayload>(LOGIN_REQUEST);
export const loginSuccess = createAction<ILoginDataResponse>(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
