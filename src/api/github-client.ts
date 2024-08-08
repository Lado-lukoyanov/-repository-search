import axios from "axios";

export const gitHubClient = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_BASE_URL,
});
