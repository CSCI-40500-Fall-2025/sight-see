import axios from "axios";

const api = axios.create({
   baseURL: "http://98.90.22.39:8080",
});

export default api;
