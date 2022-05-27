import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {Language} from "../model/Language";
import {getBasicAuthenticationConfig} from "../utils/authUtils";

const BASE_URL = "/langs";

export const fetchAllLangs = (): Promise<AxiosResponse<Array<Language>>> => {
    return axios.get<Array<Language>>(`${BASE_URL}/all`);
};

export const fetchUserLangs = (): Promise<AxiosResponse<Array<Language>>> => {
    return axios.get<Array<Language>>(BASE_URL, getBasicAuthenticationConfig());
};

export const updateChosenLang = (lang: Language): Promise<AxiosResponse<void>> => {
    return axios.put(`${BASE_URL}/chosen`, lang, getBasicAuthenticationConfig());
};

export const addUserLang = (lang: Language): Promise<AxiosResponse<void>> => {
    return axios.post(BASE_URL, lang, getBasicAuthenticationConfig());
};

export const removeUserLang = (lang: Language): Promise<AxiosResponse<void>> => {
    return axios.delete(BASE_URL, {
        params: {id: lang.id},
        ...getBasicAuthenticationConfig()
    });
};
