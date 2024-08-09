import { useState } from "react";

import { AppBar, Toolbar, InputBase, Button } from "@mui/material";

import styles from "./header.module.scss";

type HeaderProps = {
  onSearch: (query: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  const [query, setQuery] = useState("");

  const onClickSearch = () => {
    if (query.trim()) {
      onSearch(query);
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
          <Button variant="contained" className={styles.button} onClick={onClickSearch}>
            Искать
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
