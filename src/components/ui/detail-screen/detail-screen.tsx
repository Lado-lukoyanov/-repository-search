import { Box, Typography, Paper, Grid, Link } from "@mui/material";

import styles from "./detail-screen.module.scss";

import type { Repository } from "@/types/types";
import { dateToFormattedString } from "@/utils/date-to-formatted-string.util";

type RepoDetailsProps = {
  data: Repository;
};

export const RepoDetails = ({ data }: RepoDetailsProps) => (
  <Box className={styles.detailContainer}>
    <Box className={styles.boxMarginTop}>
      <Grid item xs={12}>
        <Typography variant="h5" className={styles.title}>
          {data.name || "Не указано"}
        </Typography>
        <Typography variant="subtitle1" className={styles.status}>
          Статус:
          <span className={styles.statusMargin}></span>
          <Typography className={data.private ? styles.privateStatus : styles.publicStatus}>
            {data.private ? "Приватный" : "Публичный"}
          </Typography>
        </Typography>
      </Grid>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Описание:</strong> {data.description || "Не указано"}
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Язык: </strong>
        <span className={styles.language}>{data.language || "Не указан"}</span>
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Звёзды:</strong> {data?.stargazers_count ?? "Не указано"} ⭐
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Наблюдатели:</strong> {data?.watchers_count ?? "Не указано"}
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Дата создания: </strong>
        {data?.created_at ? dateToFormattedString(data.created_at) : "Не указана"}
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Дата обновления: </strong>
        {data.updated_at ? dateToFormattedString(data.updated_at) : "Не указана"}
      </Typography>
      <Typography variant="body1" className={styles.text} gutterBottom>
        <strong>Последнее изменение: </strong>
        {data.pushed_at ? dateToFormattedString(data.pushed_at) : "Не указана"}
      </Typography>

      <Typography variant="subtitle1" className={styles.url}>
        <strong>Ссылка:</strong>
        <Link href={data.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {data.html_url}
        </Link>
      </Typography>
    </Box>
  </Box>
);
