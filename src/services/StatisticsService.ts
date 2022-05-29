import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {loadBasicAuthenticationConfig} from "../utils/authUtils";
import {LanguageStatistics} from "../model/LanguageStatistics";

const BASE_URL = "/stats";

export const fetchLanguageStatistics = (): Promise<AxiosResponse<LanguageStatistics[]>> => {
    return axios.get(BASE_URL, loadBasicAuthenticationConfig());
};
