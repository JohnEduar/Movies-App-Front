import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://movies-app-back.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosConfig };
