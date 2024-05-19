import { IAuthState } from '@/interfaces/auth';
import { createReducer } from '@reduxjs/toolkit';
import {
  loginFailure,
  loginGoogleFailure,
  loginGoogleRequest,
  loginGoogleSuccess,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  signupFailure,
  signupRequest,
  signupSuccess
} from '@/store/actions/auth';
import { ApiStatus } from '@/constants';

const initialState: IAuthState = {
  user: null,
  tokens: null,
  status: '',
  isLoading: false
};

const authReducer = createReducer<IAuthState>(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        isLoading: true
      };
    })
    .addCase(loginSuccess, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        status: ApiStatus.POST_SUCCEED,
        isLoading: false
      };
    })
    .addCase(loginFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        isLoading: false
      };
    });

  builder
    .addCase(logoutRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        isLoading: true
      };
    })
    .addCase(logoutSuccess, () => {
      return {
        ...initialState,
        status: ApiStatus.GET_SUCCEED
      };
    })
    .addCase(logoutFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.GET_FAILED,
        isLoading: false
      };
    });

  builder
    .addCase(signupRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        isLoading: true
      };
    })
    .addCase(signupSuccess, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        status: ApiStatus.POST_SUCCEED,
        isLoading: false
      };
    })
    .addCase(signupFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        isLoading: false
      };
    });

  builder
    .addCase(loginGoogleRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        isLoading: true
      };
    })
    .addCase(loginGoogleSuccess, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        status: ApiStatus.POST_SUCCEED,
        isLoading: false
      };
    })
    .addCase(loginGoogleFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        isLoading: false
      };
    });
});

export default authReducer;
