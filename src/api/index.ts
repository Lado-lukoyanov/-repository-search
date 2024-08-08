import { gitHubClient } from "./github-client";
import { ROUTES } from "./routes";

import type { RequestParams, ResponseParams } from "./types";

export const fetchRepositories = async (params: RequestParams): Promise<ResponseParams> => {
  const { data } = await gitHubClient.get<ResponseParams>(ROUTES.repositories, {
    params: {
      q: params.query,
      page: params.page,
      per_page: params.perPage,
    },
  });

  return data;
};
