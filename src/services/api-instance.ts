import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});