import axios from "./axiosInstance";
import { User } from "../model/User";

const BASE_URL = "/users";

export const fetchActiveUser = () => {
    return axios.get<User>(`${BASE_URL}/active`);
};
