import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

const BASE_URL = "/translate";

export const translateWord = (word: string): Promise<AxiosResponse<string>> => {
    return axios.get<string>(BASE_URL, {params: {word: word}});
};
