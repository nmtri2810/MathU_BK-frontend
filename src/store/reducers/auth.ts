import { IAuthState } from '@/interfaces/auth';
import { createReducer } from '@reduxjs/toolkit';
import { loginFailure, loginRequest, loginSuccess } from '@/store/actions/auth';
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
});

export default authReducer;
