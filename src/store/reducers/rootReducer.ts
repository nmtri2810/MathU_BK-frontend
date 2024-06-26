import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/reducers/auth';
import questionReducer from '@/store/reducers/questions';
import tagReducer from '@/store/reducers/tag';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  tag: tagReducer
});

export default rootReducer;
