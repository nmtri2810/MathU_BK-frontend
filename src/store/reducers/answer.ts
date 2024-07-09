import { IAnswerState } from '@/interfaces/answer';
import { createReducer } from '@reduxjs/toolkit';
import {
  createAnswerFailure,
  createAnswerRequest,
  createAnswerSuccess,
  deleteAnswerFailure,
  deleteAnswerRequest,
  deleteAnswerSuccess,
  updateAnswerFailure,
  updateAnswerRequest,
  updateAnswerSuccess
} from '@/store/actions/answer';
import { ApiStatus } from '@/constants';

const initialState: IAnswerState = {
  one: null,
  oneLoading: false,
  status: ''
};

const answerReducer = createReducer<IAnswerState>(initialState, (builder) => {
  builder
    .addCase(createAnswerRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(createAnswerSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.POST_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(createAnswerFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        oneLoading: false
      };
    });

  builder
    .addCase(updateAnswerRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(updateAnswerSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.PATCH_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(updateAnswerFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.PATCH_FAILED,
        oneLoading: false
      };
    });

  builder
    .addCase(deleteAnswerRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(deleteAnswerSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.DELETE_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(deleteAnswerFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.DELETE_FAILED,
        oneLoading: false
      };
    });
});

export default answerReducer;
