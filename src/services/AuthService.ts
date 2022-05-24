import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

const BASE_URL = "/auth";

export const loginUser = (username: string, password: string): Promise<AxiosResponse<void>> => {
    return axios.post<void>(`${BASE_URL}/login`, {username, password});
};

export const signupUser = (username: string, password: string): Promise<AxiosResponse<void>> => {
    return axios.post<void>(`${BASE_URL}/signup`, {username, password});
};

export const logoutUser = (): Promise<AxiosResponse<void>> => {
    return axios.get<void>(`${BASE_URL}/logout`);
};