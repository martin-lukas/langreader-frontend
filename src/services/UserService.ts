import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import { User } from "../model/User";

const BASE_URL = "/users";

export const fetchActiveUser = (): Promise<AxiosResponse<User>> => {
    return axios.get<User>(`${BASE_URL}/active`);
};