import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogsProps } from '../../models/models';
import { fetchDataAction } from '../actions/fetchData';

export interface LogsState {
  logs: {
    data: LogsProps[];
    hasNextPage: boolean;
  };
  fetchStatus: 'pending' | 'fulfilled' | 'rejected' | 'initial';
}

const initialState: LogsState = {
  logs: {
    data: [],
    hasNextPage: false,
  },
  fetchStatus: 'initial',
};

interface ResponsePayload {
  logs: LogsProps[];
  hasNextPage: boolean;
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataAction.pending, (state) => {
      state.fetchStatus = 'pending';
    });
    builder.addCase(
      fetchDataAction.fulfilled,
      (state, action: PayloadAction<ResponsePayload>) => {
        state.logs.data = [
          ...state.logs.data,
          ...action.payload.logs,
        ];
        state.logs.hasNextPage = action.payload.hasNextPage;
        state.fetchStatus = 'fulfilled';
      },
    );
    builder.addCase(fetchDataAction.rejected, (state) => {
      state.fetchStatus = 'rejected';
    });
  },
});

export default dataSlice.reducer;
