import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  timeout: 5000,
});

export const hasConfiguredApi = Boolean(process.env.REACT_APP_API_URL);

export default apiClient;
