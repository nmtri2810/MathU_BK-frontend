import { IPaginationPayload } from '@/interfaces';
import {
  ICreateQuestionDataResponse,
  ICreateQuestionPayload,
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

export const listQuestionRequest = createAction<IListQuestionPayload>(LIST_QUESTION_REQUEST);
export const listQuestionSuccess = createAction<IListQuestionDataResponse>(LIST_QUESTION_SUCCESS);
export const listQuestionFailure = createAction(LIST_QUESTION_FAILURE);

export const updateParams = createAction<IPaginationPayload>(UPDATE_PARAMS);

export const createQuestionRequest = createAction<ICreateQuestionPayload>(CREATE_QUESTION_REQUEST);
export const createQuestionSuccess = createAction<ICreateQuestionDataResponse>(CREATE_QUESTION_SUCCESS);
export const createQuestionFailure = createAction(CREATE_QUESTION_FAILURE);
