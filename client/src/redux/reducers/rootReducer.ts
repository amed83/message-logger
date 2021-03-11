import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from './dataReducer';

const rootReducer = combineReducers({
  data: dataSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
