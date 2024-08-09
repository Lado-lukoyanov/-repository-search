import { RepoStatus } from "./enums/status.enum";

export type Repository = {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: {
    name: string;
  };
  topics: string[];
};

export type RepoState = {
  repositories: Repository[];
  status: RepoStatus.IDLE | RepoStatus.LOADING | RepoStatus.SUCCEEDED | RepoStatus.FAILED;
  error: string | null;
};
