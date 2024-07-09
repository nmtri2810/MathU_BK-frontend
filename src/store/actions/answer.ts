import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from '@/store/actions/reduxActions';
import { IAnswer, ICreateAnswerPayload, IDeleteAnswerPayload, IUpdateAnswerPayload } from '@/interfaces/answer';

const context = 'answer';

export const [CREATE_ANSWER_REQUEST, CREATE_ANSWER_SUCCESS, CREATE_ANSWER_FAILURE] = createActionTypes(
  `${context}/CREATE_ANSWER`
);
export const [UPDATE_ANSWER_REQUEST, UPDATE_ANSWER_SUCCESS, UPDATE_ANSWER_FAILURE] = createActionTypes(
  `${context}/UPDATE_ANSWER`
);
export const [DELETE_ANSWER_REQUEST, DELETE_ANSWER_SUCCESS, DELETE_ANSWER_FAILURE] = createActionTypes(
  `${context}/DELETE_ANSWER`
);

export const createAnswerRequest = createAction<ICreateAnswerPayload>(CREATE_ANSWER_REQUEST);
export const createAnswerSuccess = createAction<IAnswer>(CREATE_ANSWER_SUCCESS);
export const createAnswerFailure = createAction(CREATE_ANSWER_FAILURE);

export const updateAnswerRequest = createAction<IUpdateAnswerPayload>(UPDATE_ANSWER_REQUEST);
export const updateAnswerSuccess = createAction<IAnswer>(UPDATE_ANSWER_SUCCESS);
export const updateAnswerFailure = createAction(UPDATE_ANSWER_FAILURE);

export const deleteAnswerRequest = createAction<IDeleteAnswerPayload>(DELETE_ANSWER_REQUEST);
export const deleteAnswerSuccess = createAction<IAnswer>(DELETE_ANSWER_SUCCESS);
export const deleteAnswerFailure = createAction(DELETE_ANSWER_FAILURE);
