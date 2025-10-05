import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosConfig };
