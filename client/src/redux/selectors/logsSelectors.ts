import { createSelector } from 'reselect';
import { RootState } from '../reducers/rootReducer';

export const getState = createSelector(
  (state: RootState) => state,
  (state) => state.data,
);

export const getLogs = createSelector(
  getState,
  (getState) => getState.logs,
);

export const getFetchStatus = createSelector(
  getState,
  (getState) => getState.fetchStatus,
);
