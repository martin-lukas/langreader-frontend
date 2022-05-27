import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {getBasicAuthConfig} from "../utils/authUtils";

const BASE_URL = "/translate";

export const translateWord = (word: string): Promise<AxiosResponse<string>> => {
    return axios.get<string>(BASE_URL, {
        params: {word: word},
        ...getBasicAuthConfig()
    });
};
