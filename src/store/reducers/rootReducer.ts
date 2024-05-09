import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/store/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
