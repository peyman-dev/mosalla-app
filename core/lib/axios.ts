import axios from "axios";

const baseURL = process.env.BASE_URI || "http://localhost:3000";

export const request = axios.create({
  baseURL,
});
