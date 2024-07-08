import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from '@/store/actions/reduxActions';
import { ICheckQuesDupPayload, ICheckQuesDupResponse } from '@/interfaces/openai';

const context = 'openai';

export const [CHECK_QUES_DUP_REQUEST, CHECK_QUES_DUP_SUCCESS, CHECK_QUES_DUP_FAILURE] = createActionTypes(
  `${context}/OPENAI`
);

export const checkQuesDupRequest = createAction<ICheckQuesDupPayload>(CHECK_QUES_DUP_REQUEST);
export const checkQuesDupSuccess = createAction<ICheckQuesDupResponse>(CHECK_QUES_DUP_SUCCESS);
export const checkQuesDupFailure = createAction(CHECK_QUES_DUP_FAILURE);
