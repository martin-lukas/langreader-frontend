import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {loadBasicAuthenticationConfig} from "../utils/authUtils";

const BASE_URL = "/users";

export const deleteOwnAccount = (): Promise<AxiosResponse<void>> => {
    return axios.delete(BASE_URL, loadBasicAuthenticationConfig());
};
