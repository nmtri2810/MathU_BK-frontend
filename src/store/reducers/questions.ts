import { IQuestionState } from '@/interfaces/question';
import { createReducer } from '@reduxjs/toolkit';
import {
  createQuestionFailure,
  createQuestionRequest,
  createQuestionSuccess,
  getQuestionFailure,
  getQuestionRequest,
  getQuestionSuccess,
  listQuestionFailure,
  listQuestionRequest,
  listQuestionSuccess,
  updateParams
} from '@/store/actions/question';
import { ApiStatus, ItemsPerPage } from '@/constants';

const initialState: IQuestionState = {
  list: null,
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1, // default
    perPage: Number(ItemsPerPage[0]), // default
    prev: 0,
    next: 0
  },
  keyword: '',
  listLoading: false,
  one: null,
  oneLoading: false,
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

  builder.addCase(updateParams, (state, action) => {
    return {
      ...state,
      meta: {
        ...state.meta,
        currentPage: action.payload.page,
        perPage: action.payload.perPage
      },
      keyword: action.payload.keyword
    };
  });

  builder
    .addCase(createQuestionRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(createQuestionSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.POST_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(createQuestionFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.POST_FAILED,
        oneLoading: false
      };
    });

  builder
    .addCase(getQuestionRequest, (state) => {
      return {
        ...state,
        status: ApiStatus.REQUESTING,
        oneLoading: true
      };
    })
    .addCase(getQuestionSuccess, (state, action) => {
      return {
        ...state,
        one: action.payload,
        status: ApiStatus.GET_SUCCEED,
        oneLoading: false
      };
    })
    .addCase(getQuestionFailure, (state) => {
      return {
        ...state,
        status: ApiStatus.GET_FAILED,
        oneLoading: false
      };
    });
});

export default questionReducer;
