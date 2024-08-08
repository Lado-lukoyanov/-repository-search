import React from "react";

import type { Repository } from "../types/types";

type RepoDetailsProps = {
  data?: Repository;
};

export const RepoDetails = ({ data }: RepoDetailsProps) => {
  return <div>{data.name}</div>;
};
