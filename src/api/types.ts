import type { Repository } from "../types/types";

export type RequestParams = {
  query: string;
  page: number;
  perPage: number;
};

export type ResponseParams = {
  items: Repository[];
  total_count: number;
};
