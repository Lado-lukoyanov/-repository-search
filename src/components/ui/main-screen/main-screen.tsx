import { useState } from "react";

import { Typography } from "@mui/material";
import { StatusHandler } from "../../lib/status-handler";
import { RepoScreen } from "../repo-screen/repo-screen";
import { Header } from "../header/header";

import { useAppSelector } from "../../../hooks/useAppSelector";

import styles from "./main-screen.module.scss";

import type { MouseEvent, ChangeEvent } from "react";

export const MainScreen = () => {
  const { repositories, status, error } = useAppSelector((state) => state.repos);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageClick = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header perPage={rowsPerPage} page={page} />
      <StatusHandler status={[status === "idle"]}>
        <Typography variant="h3" component="div" className={styles.mainText}>
          Добро Пожаловать
        </Typography>
      </StatusHandler>
      <StatusHandler status={[status === "loading"]}>
        <Typography variant="h3" component="div" className={styles.mainText}>
          Загрузка...
        </Typography>
      </StatusHandler>
      <StatusHandler status={[status === "succeeded"]}>
        <RepoScreen
          data={repositories}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePageClick}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </StatusHandler>
      <StatusHandler status={[status === "failed"]}>
        <Typography variant="h3" component="div" className={styles.mainText}>
          {error}
        </Typography>
      </StatusHandler>
    </>
  );
};
