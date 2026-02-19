import axios from "axios";

const baseURL = process.env.BASE_URI || "http://194.48.198.187:8000/api";

export const request = axios.create({
  baseURL,
});

request.interceptors.response.use(
  (response) => response, // 2xx just pass through
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data); // ← backend gets thrown directly
    }
    return Promise.reject(error);
  },
);
