import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogsProps } from "../reducers/dataReducer";

enum FetchDataActionTypes {
  FetchData = "FETCH_DATA",
  FetchDataSuccess = "FETCH_DATA_SUCCESS",
  FetchDataError = "FETCH_DATA_ERROR",
}

export const fetchDataAction = createAsyncThunk(
  FetchDataActionTypes.FetchData,
  async (page: number) => {
    const response = await fetch(`api/users?page=${page}`);
    return await response.json();
  }
);
