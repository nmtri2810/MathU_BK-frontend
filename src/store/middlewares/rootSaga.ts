import { all } from 'redux-saga/effects';
import watchAuth from '@/store/middlewares/authSaga';

export default function* rootSaga() {
  yield all([watchAuth()]);
}
