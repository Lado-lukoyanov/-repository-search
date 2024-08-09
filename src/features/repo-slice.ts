import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRepositories } from "@/api";
import { RepoStatus } from "@/types/enums/status.enum";

import type { RequestParams, ResponseParams } from "@/api/types";
import type { Repository, RepoState } from "@/types/types";

const REPOS = "repos";
const TYPE_REPOS = `${REPOS}/getRepositories`;

const initialState: RepoState = {
  // изначальное состояние при которой список репозиториев пуст и изначальный статус в ожидании
  repositories: [],
  status: RepoStatus.IDLE,
  error: null,
};

export const getRepositories = createAsyncThunk<Repository[], RequestParams>( //создаем асинхронную функцию для получения списка репозиториев
  TYPE_REPOS,
  async (params: RequestParams) => {
    const response: ResponseParams = await fetchRepositories(params);
    return response.items;
  }
);

const repoSlice = createSlice({
  // создание слайса для дальнейшей работы
  name: REPOS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.pending, (state) => {
        state.status = RepoStatus.LOADING;
      })
      .addCase(getRepositories.fulfilled, (state, action) => {
        state.status = RepoStatus.SUCCEEDED;
        state.repositories = action.payload;
      })
      .addCase(getRepositories.rejected, (state, action) => {
        state.status = RepoStatus.FAILED;
        state.error = action.error.message || null;
      });
  },
});

export const reducer = repoSlice.reducer;
