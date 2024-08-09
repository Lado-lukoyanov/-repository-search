import { useState } from "react";

import { Typography } from "@mui/material";
import { StatusHandler } from "@/components/lib/status-handler";
import { RepoScreen } from "@/components/ui/repo-screen/repo-screen";
import { Header } from "@/components/ui/header/header";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getRepositories } from "@/features/repo-slice";

import styles from "./main-screen.module.scss";

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const { repositories, status, error } = useAppSelector((state) => state.repos);
  const [, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const onSearch = (query: string) => {
    if (query.trim()) {
      dispatch(getRepositories({ query, page: currentPage + 1, perPage: 100 }));
    }
  };

  const onNextPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onRowsMorePerPageChange = (rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
  };

  console.log(styles.mainText);

  return (
    <>
      <Header onSearch={onSearch} />
      <StatusHandler status={[status === "idle"]}>
        <Typography className={styles.mainText}>Добро Пожаловать</Typography>
      </StatusHandler>
      <StatusHandler status={[status === "loading"]}>
        <Typography className={styles.mainText}>Загрузка...</Typography>
      </StatusHandler>
      <StatusHandler status={[status === "succeeded"]}>
        <RepoScreen data={repositories} onChangePage={onNextPageChange} onChangeRowsPerPage={onRowsMorePerPageChange} />
      </StatusHandler>
      <StatusHandler status={[status === "failed"]}>
        <Typography className={styles.mainText}>{error}</Typography>
      </StatusHandler>
    </>
  );
};
