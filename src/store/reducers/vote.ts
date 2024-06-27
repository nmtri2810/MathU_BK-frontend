import { ApiStatus } from '@/constants';
import { IVoteState } from '@/interfaces/vote';
import {
  createVoteFailure,
  createVoteRequest,
  createVoteSuccess,
  deleteVoteFailure,
  deleteVoteRequest,
  deleteVoteSuccess,
  updateVoteFailure,
  updateVoteRequest,
  updateVoteSuccess
} from '@/store/actions/vote';
import { createReducer } from '@reduxjs/toolkit';

const initialState: IVoteState = {
  one: null,
  oneLoading: false,
  status: ''
};

const voteReducer = createReducer<IVoteState>(initialState, (builder) => {
  builder
    .addCase(createVoteRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(createVoteSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.POST_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(createVoteFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        oneLoading: false
      };
    });

  builder
    .addCase(updateVoteRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(updateVoteSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.PATCH_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(updateVoteFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.PATCH_FAILED,
        oneLoading: false
      };
    });

  builder
    .addCase(deleteVoteRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(deleteVoteSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.DELETE_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(deleteVoteFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.DELETE_FAILED,
        oneLoading: false
      };
    });
});

export default voteReducer;
