import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {Language} from "../model/Language";

const BASE_URL = "/langs";

export const fetchAllLangs = (): Promise<AxiosResponse<Array<Language>>> => {
    return axios.get<Array<Language>>(`${BASE_URL}/all`);
};

export const fetchUserLangs = (): Promise<AxiosResponse<Array<Language>>> => {
    return axios.get<Array<Language>>(BASE_URL);
};

export const fetchChosenLang = (): Promise<AxiosResponse<Language>> => {
    return axios.get<Language>(`${BASE_URL}/chosen`);
};

export const updateChosenLang = (lang: Language): void => {
    axios.put(`${BASE_URL}/chosen`, lang)
        .catch(err => console.error(err.response.data));
};

export const addUserLang = (lang: Language): void => {
    axios.post(BASE_URL, lang)
        .catch(err => console.error(err.response.data));
};

export const removeUserLang = (lang: Language): void => {
    axios.delete(BASE_URL, {params: {id: lang.id}})
        .catch(err => console.error(err.response.data));
};
