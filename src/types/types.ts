import { RepoStatus } from "../enums/status.enum";

export type Repository = {
  id: number;
  name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  description: string;
  license: {
    name: string;
  } | null;
};

export type RepoState = {
  repositories: Repository[];
  status: RepoStatus.IDLE | RepoStatus.LOADING | RepoStatus.SUCCEEDED | RepoStatus.FAILED;
  error: string | null;
  totalPages: number;
  currentPage: number;
};
