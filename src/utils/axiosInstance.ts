import Axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const axiosInstance = Axios.create({baseURL: `${isDevelopment ? "http://localhost:8080" : ""}/api`});

axiosInstance.interceptors.request.use((config) => {
    config.headers["Content-type"] = "application/json";
    return config;
});

export default axiosInstance;