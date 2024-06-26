import { all } from 'redux-saga/effects';
import watchAuth from '@/store/middlewares/authSaga';
import watchQuestion from '@/store/middlewares/questionSaga';
import watchTag from '@/store/middlewares/tagSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchQuestion(), watchTag()]);
}
