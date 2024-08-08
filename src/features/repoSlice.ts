import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Repository, RepoState } from "../types/types";
import { fetchRepositories } from "../api";
import { RepoStatus } from "../enums/status.enum";

const REPOS = "repos";
const TYPE_REPOS = `${REPOS}/getRepositories`;

const initialState: RepoState = {
  repositories: [],
  status: RepoStatus.IDLE,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

export const getRepositories = createAsyncThunk(
  TYPE_REPOS,
  async (params: { query: string; page: number; perPage: number }) => {
    const { query, page, perPage } = params;
    const response = await fetchRepositories({
      query,
      page,
      perPage,
    });
    return {
      items: response.items,
      totalPages: response.total_count,
    };
  }
);

export const repoSlice = createSlice({
  name: REPOS,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.pending, (state) => {
        state.status = RepoStatus.LOADING;
      })
      .addCase(
        getRepositories.fulfilled,
        (state, action: PayloadAction<{ items: Repository[]; totalPages: number }>) => {
          state.status = RepoStatus.SUCCEEDED;
          state.repositories = action.payload.items;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(getRepositories.rejected, (state, action) => {
        state.status = RepoStatus.FAILED;
        state.error = action.error.message || null;
      });
  },
});

export const { setPage } = repoSlice.actions;
