import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";

import styles from "./repo-table.module.scss";

import type { MouseEvent, ChangeEvent } from "react";
import type { Repository } from "../../../types/types";

type RepoTableProps = {
  data: Repository[];
  rowsPerPage: number;
  page: number;
  onSelected: (data: Repository) => void;
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const RepoTable = ({
  onSelected,
  data,
  page,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPage,
}: RepoTableProps) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<"stargazers_count" | "forks_count" | "updated_at">("stargazers_count");

  const handleRequestSort = (property: "stargazers_count" | "forks_count" | "updated_at") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortRepositories = (repos: Repository[]) => {
    return repos.slice().sort((a, b) => {
      if (orderBy === "stargazers_count" || orderBy === "forks_count") {
        return (order === "asc" ? 1 : -1) * (a[orderBy] - b[orderBy]);
      } else {
        return (order === "asc" ? 1 : -1) * (new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime());
      }
    });
  };

  return (
    <Box className={styles.tableContainer}>
      <Typography variant="h3" component="div">
        Результаты поиска
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "forks_count"}
                  direction={orderBy === "forks_count" ? order : "asc"}
                  onClick={() => handleRequestSort("forks_count")}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stargazers_count"}
                  direction={orderBy === "stargazers_count" ? order : "asc"}
                  onClick={() => handleRequestSort("stargazers_count")}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "updated_at"}
                  direction={orderBy === "updated_at" ? order : "asc"}
                  onClick={() => handleRequestSort("updated_at")}
                >
                  Дата обновления
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRepositories(data).map((repo) => (
              <TableRow key={repo.id} onClick={() => onSelected(repo)}>
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.language}</TableCell>
                <TableCell>{repo.forks_count}</TableCell>
                <TableCell>{repo.stargazers_count}</TableCell>
                <TableCell>{repo.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      ></TablePagination>
    </Box>
  );
};
