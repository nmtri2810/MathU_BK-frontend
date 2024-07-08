import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/reducers/auth';
import questionReducer from '@/store/reducers/questions';
import tagReducer from '@/store/reducers/tag';
import voteReducer from '@/store/reducers/vote';
import answerReducer from '@/store/reducers/answer';
import openaiReducer from '@/store/reducers/openai';

const rootReducer = combineReducers({
  auth: authReducer,
  question: questionReducer,
  tag: tagReducer,
  vote: voteReducer,
  answer: answerReducer,
  openai: openaiReducer
});

export default rootReducer;
