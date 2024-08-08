import { useState } from "react";

import { AppBar, Toolbar, InputBase, Button } from "@mui/material";
import { getRepositories } from "../../../features/repoSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

import styles from "./header.module.scss";

type HeaderProps = {
  page: number;
  perPage: number;
};

export const Header = ({ page, perPage }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(getRepositories({ query, page, perPage }));
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <div className={styles.search}>
          <InputBase
            placeholder="Введите поисковый запрос"
            className={styles.input}
            inputProps={{ "aria-label": "search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="contained" className={styles.button} onClick={handleSearch}>
            Искать
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
