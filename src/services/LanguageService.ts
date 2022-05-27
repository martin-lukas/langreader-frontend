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

export const fetchChosenLang = (): Promise<AxiosResponse<Language>> => {
    return axios.get<Language>(`${BASE_URL}/chosen`, getBasicAuthenticationConfig());
};

export const updateChosenLang = (lang: Language): void => {
    axios.put(`${BASE_URL}/chosen`, lang, getBasicAuthenticationConfig())
        .catch(err => console.error(err.response.data));
};

export const addUserLang = (lang: Language): void => {
    axios.post(BASE_URL, lang, getBasicAuthenticationConfig())
        .catch(err => console.error(err.response.data));
};

export const removeUserLang = (lang: Language): void => {
    axios.delete(BASE_URL, {
        params: {id: lang.id},
        ...getBasicAuthenticationConfig()
    }).catch(err => console.error(err.response.data));
};
