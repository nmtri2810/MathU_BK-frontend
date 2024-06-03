import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/reducers/auth';
import questionReducer from '@/store/reducers/questions';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer
});

export default rootReducer;
