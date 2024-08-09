import { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";

import { RepoTable } from "@/components/ui/table/repo-table";
import { RepoDetails } from "@/components/ui/detail-screen/detail-screen";

import styles from "./repo-screen.module.scss";

import type { Repository } from "@/types/types";
import type { ChangeEvent, MouseEvent } from "react";

type RepoScreenProps = {
  data: Repository[];
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
};

export const RepoScreen = ({ data, onChangePage, onChangeRowsPerPage }: RepoScreenProps) => {
  const [repositories, setRepositories] = useState<Repository | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    onChangePage(page);
    onChangeRowsPerPage(rowsPerPage);
  }, [page]);

  useEffect(() => {
    onChangeRowsPerPage(rowsPerPage);
  }, [rowsPerPage]);

  const onNextPage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);

  const onNextRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <Box className={styles.repoScreen}>
      <Box className={styles.tableContainer}>
        <RepoTable
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onNextPage}
          onChangeRowsPerPage={onNextRowsPerPage}
          onSelected={setRepositories}
        />
      </Box>
      <Box className={styles.detailContainer}>
        {!repositories ? (
          <Box className={styles.textValueContainer}>
            <Typography className={styles.textValue}>Выберите репозиторий</Typography>
          </Box>
        ) : (
          <RepoDetails data={repositories} />
        )}
      </Box>
    </Box>
  );
};
