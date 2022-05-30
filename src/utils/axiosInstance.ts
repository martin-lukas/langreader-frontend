import Axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const axiosInstance = Axios.create({baseURL: `${isDevelopment ? "http://localhost:8080" : ""}/api`});

axiosInstance.defaults.headers.common["Content-type"] = "application/json";

export default axiosInstance;