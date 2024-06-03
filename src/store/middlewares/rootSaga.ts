import { all } from 'redux-saga/effects';
import watchAuth from '@/store/middlewares/authSaga';
import watchQuestion from '@/store/middlewares/questionSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchQuestion()]);
}
