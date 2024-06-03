import { IQuestionState } from '@/interfaces/question';
import { createReducer } from '@reduxjs/toolkit';
import { listQuestionFailure, listQuestionRequest, listQuestionSuccess } from '@/store/actions/question';
import { ApiStatus } from '@/constants';

const initialState: IQuestionState = {
  list: null,
  meta: null,
  listLoading: false,
  status: ''
};

const questionReducer = createReducer<IQuestionState>(initialState, (builder) => {
  builder
    .addCase(listQuestionRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        listLoading: true
      };
    })
    .addCase(listQuestionSuccess, (state, action) => {
      return {
        ...state,
        list: action.payload.list,
        meta: action.payload.meta,
        status: ApiStatus.GET_SUCCEED,
        listLoading: false
      };
    })
    .addCase(listQuestionFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.GET_FAILED,
        listLoading: false
      };
    });
});

export default questionReducer;
