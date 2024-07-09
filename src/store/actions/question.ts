import { IPaginationPayload } from '@/interfaces';
import {
  IQuestionBEResponse,
  ICreateQuestionPayload,
  IDeleteQuestionPayload,
  IGetQuestionPayload,
  IListQuestionDataResponse,
  IListQuestionPayload
} from '@/interfaces/question';
import { createActionTypes } from '@/store/actions/reduxActions';
import { createAction } from '@reduxjs/toolkit';

const context = 'question';

export const [LIST_QUESTION_REQUEST, LIST_QUESTION_SUCCESS, LIST_QUESTION_FAILURE] = createActionTypes(
  `${context}/LIST_QUESTION`
);
export const UPDATE_PARAMS = `${context}/UPDATE_PARAMS`;
export const [CREATE_QUESTION_REQUEST, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_FAILURE] = createActionTypes(
  `${context}/CREATE_QUESTION`
);
export const [GET_QUESTION_REQUEST, GET_QUESTION_SUCCESS, GET_QUESTION_FAILURE] = createActionTypes(
  `${context}/GET_QUESTION`
);
export const [DELETE_QUESTION_REQUEST, DELETE_QUESTION_SUCCESS, DELETE_QUESTION_FAILURE] = createActionTypes(
  `${context}/DELETE_QUESTION`
);
export const [UPDATE_QUESTION_REQUEST, UPDATE_QUESTION_SUCCESS, UPDATE_QUESTION_FAILURE] = createActionTypes(
  `${context}/UPDATE_QUESTION`
);

export const listQuestionRequest = createAction<IListQuestionPayload>(LIST_QUESTION_REQUEST);
export const listQuestionSuccess = createAction<IListQuestionDataResponse>(LIST_QUESTION_SUCCESS);
export const listQuestionFailure = createAction(LIST_QUESTION_FAILURE);

export const updateParams = createAction<IPaginationPayload>(UPDATE_PARAMS);

export const createQuestionRequest = createAction<ICreateQuestionPayload>(CREATE_QUESTION_REQUEST);
export const createQuestionSuccess = createAction<IQuestionBEResponse>(CREATE_QUESTION_SUCCESS);
export const createQuestionFailure = createAction(CREATE_QUESTION_FAILURE);

export const getQuestionRequest = createAction<IGetQuestionPayload>(GET_QUESTION_REQUEST);
export const getQuestionSuccess = createAction<IQuestionBEResponse>(GET_QUESTION_SUCCESS);
export const getQuestionFailure = createAction(GET_QUESTION_FAILURE);

export const deleteQuestionRequest = createAction<IDeleteQuestionPayload>(DELETE_QUESTION_REQUEST);
export const deleteQuestionSuccess = createAction<IQuestionBEResponse>(DELETE_QUESTION_SUCCESS);
export const deleteQuestionFailure = createAction(DELETE_QUESTION_FAILURE);

export const updateQuestionRequest = createAction(UPDATE_QUESTION_REQUEST);
export const updateQuestionSuccess = createAction(UPDATE_QUESTION_SUCCESS);
export const updateQuestionFailure = createAction(UPDATE_QUESTION_FAILURE);
