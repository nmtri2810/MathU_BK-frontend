import { all } from 'redux-saga/effects';
import watchAuth from '@/store/middlewares/authSaga';
import watchQuestion from '@/store/middlewares/questionSaga';
import watchTag from '@/store/middlewares/tagSaga';
import watchVote from '@/store/middlewares/voteSaga';
import watchAnswer from '@/store/middlewares/answerSaga';
import watchOpenAI from './openaiSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchQuestion(), watchTag(), watchVote(), watchAnswer(), watchOpenAI()]);
}
