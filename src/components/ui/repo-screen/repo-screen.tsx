import { ChangeEvent, MouseEvent, useState } from "react";

import { Box } from "@mui/material";

import type { Repository } from "../../../types/types";
import { RepoTable } from "../table/repo-table";
import { RepoDetails } from "../detail-screen/detail-screen";

import styles from "./repo-screen.module.scss";

type RepoScreenProps = {
  data: Repository[];
  rowsPerPage: number;
  page: number;
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const RepoScreen = ({ data, rowsPerPage, page, onChangePage, onChangeRowsPerPage }: RepoScreenProps) => {
  const [repositories, setRepositories] = useState<Repository | null>(null);

  return (
    <Box className={styles.repoScreen}>
      <Box className={styles.tableContainer}>
        <RepoTable
          data={data}
          onSelected={setRepositories}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Box>
      <Box className={styles.detailContainer}>
        {/* <Typography component="div" className={styles.textValue}>
            Выберите репозитарий
          </Typography> */}

        <RepoDetails data={repositories} />
      </Box>
    </Box>
  );
};
