import { ApiStatus } from '@/constants';
import { IOpenAIState } from '@/interfaces/openai';
import { createReducer } from '@reduxjs/toolkit';
import { checkQuesDupFailure, checkQuesDupRequest, checkQuesDupSuccess } from '../actions/openai';

const initialState: IOpenAIState = {
  data: null,
  loading: false,
  status: ''
};

const openaiReducer = createReducer<IOpenAIState>(initialState, (builder) => {
  builder
    .addCase(checkQuesDupRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        loading: true
      };
    })
    .addCase(checkQuesDupSuccess, (state, action) => {
      return {
        ...state,
        data: action.payload,
        status: ApiStatus.POST_SUCCEED,
        loading: false
      };
    })
    .addCase(checkQuesDupFailure, (state) => {
      return {
        ...state,
        data: null,
        status: ApiStatus.POST_FAILED,
        loading: false
      };
    });
});

export default openaiReducer;
