// src/services/api-service.ts
import axios from "axios";
import { BASE_URL, API_KEY } from "../constants";

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Додайте API ключ до кожного запиту
http.interceptors.request.use((config) => {
  if (!API_KEY) {
    console.error("API Key is missing!");
    return Promise.reject(new Error("API Key is missing"));
  }

  config.params = {
    ...config.params,
    api_key: API_KEY,
  };
  return config;
});

// Обробка помилок
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Check your API key");
    }
    return Promise.reject(error);
  }
);

export default http;
