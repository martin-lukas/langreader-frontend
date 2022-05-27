import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {User} from "../model/User";

const BASE_URL = "/auth";

export const loginUser = (username: string, password: string): Promise<AxiosResponse<User>> => {
    return axios.post(`${BASE_URL}/login`, {username, password});
};

export const signupUser = (username: string, password: string): Promise<AxiosResponse<void>> => {
    return axios.post<void>(`${BASE_URL}/signup`, {username, password});
};
