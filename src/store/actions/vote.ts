import { createAction } from '@reduxjs/toolkit';
import { createActionTypes } from '@/store/actions/reduxActions';
import { ICreateVotePayload, IDeleteVotePayload, IUpdateVotePayload, IVote } from '@/interfaces/vote';

const context = 'vote';

export const [CREATE_VOTE_REQUEST, CREATE_VOTE_SUCCESS, CREATE_VOTE_FAILURE] = createActionTypes(
  `${context}/CREATE_VOTE`
);
export const [UPDATE_VOTE_REQUEST, UPDATE_VOTE_SUCCESS, UPDATE_VOTE_FAILURE] = createActionTypes(
  `${context}/UPDATE_VOTE`
);
export const [DELETE_VOTE_REQUEST, DELETE_VOTE_SUCCESS, DELETE_VOTE_FAILURE] = createActionTypes(
  `${context}/DELETE_VOTE`
);

export const createVoteRequest = createAction<ICreateVotePayload>(CREATE_VOTE_REQUEST);
export const createVoteSuccess = createAction<IVote>(CREATE_VOTE_SUCCESS);
export const createVoteFailure = createAction(CREATE_VOTE_FAILURE);

export const updateVoteRequest = createAction<IUpdateVotePayload>(UPDATE_VOTE_REQUEST);
export const updateVoteSuccess = createAction<IVote>(UPDATE_VOTE_SUCCESS);
export const updateVoteFailure = createAction(UPDATE_VOTE_FAILURE);

export const deleteVoteRequest = createAction<IDeleteVotePayload>(DELETE_VOTE_REQUEST);
export const deleteVoteSuccess = createAction<IVote>(DELETE_VOTE_SUCCESS);
export const deleteVoteFailure = createAction(DELETE_VOTE_FAILURE);
