import { ITagState } from '@/interfaces/tag';
import { createReducer } from '@reduxjs/toolkit';
import { listTagFailure, listTagRequest, listTagSuccess } from '@/store/actions/tag';
import { ApiStatus } from '@/constants';

const initialState: ITagState = {
  list: null,
  listLoading: false,
  status: ''
};

const tagReducer = createReducer<ITagState>(initialState, (builder) => {
  builder
    .addCase(listTagRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        listLoading: true
      };
    })
    .addCase(listTagSuccess, (state, action) => {
      return {
        ...state,
        list: action.payload,
        status: ApiStatus.GET_SUCCEED,
        listLoading: false
      };
    })
    .addCase(listTagFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.GET_FAILED,
        listLoading: false
      };
    });
});

export default tagReducer;
