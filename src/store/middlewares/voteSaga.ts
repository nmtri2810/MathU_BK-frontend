import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_VOTE_REQUEST,
  DELETE_VOTE_REQUEST,
  UPDATE_VOTE_REQUEST,
  createVoteFailure,
  createVoteSuccess,
  deleteVoteFailure,
  deleteVoteSuccess,
  updateVoteFailure,
  updateVoteSuccess
} from '@/store/actions/vote';
import {
  TCreateVoteAction,
  TCreateVoteResponse,
  TDeleteVoteAction,
  TDeleteVoteResponse,
  TUpdateVoteAction,
  TUpdateVoteResponse
} from '@/interfaces/vote';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import voteAPI from '@/api/vote';

function* createVoteSaga(action: TCreateVoteAction) {
  try {
    const { payload } = action;
    const response: TCreateVoteResponse = yield call(voteAPI.create, payload);
    yield put(createVoteSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(createVoteFailure());
    }
  }
}

function* updateVoteSaga(action: TUpdateVoteAction) {
  try {
    const { payload } = action;
    const response: TUpdateVoteResponse = yield call(voteAPI.update, payload);
    yield put(updateVoteSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(updateVoteFailure());
    }
  }
}

function* deleteVoteSaga(action: TDeleteVoteAction) {
  try {
    const { payload } = action;
    const response: TDeleteVoteResponse = yield call(voteAPI.delete, payload);
    yield put(deleteVoteSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message;
      toast.error(message);
      yield put(deleteVoteFailure());
    }
  }
}

function* watchVote() {
  yield takeLatest(CREATE_VOTE_REQUEST, createVoteSaga);
  yield takeLatest(UPDATE_VOTE_REQUEST, updateVoteSaga);
  yield takeLatest(DELETE_VOTE_REQUEST, deleteVoteSaga);
}

export default watchVote;
