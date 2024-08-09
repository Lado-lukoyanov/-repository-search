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

import { dateToFormattedString } from "@/utils/date-to-formatted-string.util";

import styles from "./repo-table.module.scss";

import type { MouseEvent, ChangeEvent } from "react";
import type { Repository } from "@/types/types";

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
  const [filter, setFilter] = useState<"asc" | "desc">("asc");
  const [filterBy, setFilterBy] = useState<"stargazers_count" | "forks_count" | "updated_at">("stargazers_count");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const onRequestSort = (property: "stargazers_count" | "forks_count" | "updated_at") => {
    const isAsc = filterBy === property && filter === "asc";
    setFilter(isAsc ? "desc" : "asc");
    setFilterBy(property);
  };

  const sortRepositories = (repos: Repository[]) => {
    return repos.slice().sort((a, b) => {
      if (filterBy === "stargazers_count" || filterBy === "forks_count") {
        return (filter === "asc" ? 1 : -1) * (a[filterBy] - b[filterBy]);
      } else {
        return (filter === "asc" ? 1 : -1) * (new Date(a[filterBy]).getTime() - new Date(b[filterBy]).getTime());
      }
    });
  };

  const onRowClick = (repo: Repository) => {
    setSelectedRowId(repo.id);
    onSelected(repo);
  };

  return (
    <Box className={styles.tableContainer}>
      <Typography className={styles.title}>Результаты поиска</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>
                <TableSortLabel
                  active={filterBy === "forks_count"}
                  direction={filterBy === "forks_count" ? filter : "asc"}
                  onClick={() => onRequestSort("forks_count")}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filterBy === "stargazers_count"}
                  direction={filterBy === "stargazers_count" ? filter : "asc"}
                  onClick={() => onRequestSort("stargazers_count")}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filterBy === "updated_at"}
                  direction={filterBy === "updated_at" ? filter : "asc"}
                  onClick={() => onRequestSort("updated_at")}
                >
                  Дата обновления
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRepositories(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((value) => (
                <TableRow
                  className={selectedRowId === value.id ? styles.selectedRow : ""}
                  key={value.id}
                  onClick={() => onRowClick(value)}
                >
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.language}</TableCell>
                  <TableCell>{value.forks_count}</TableCell>
                  <TableCell>{value.stargazers_count}</TableCell>
                  <TableCell>{dateToFormattedString(value.updated_at)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};
