import { IAnswerState } from '@/interfaces/answer';
import { createReducer } from '@reduxjs/toolkit';
import { createAnswerFailure, createAnswerRequest, createAnswerSuccess } from '@/store/actions/answer';
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
});

export default answerReducer;
