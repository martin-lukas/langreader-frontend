import axios from "./axiosInstance";
import {Language} from "../model/Language";

const BASE_URL = '/langs';

export const fetchAllLangs = () => axios.get(`${BASE_URL}/all`);

export const fetchUserLangs = () => axios.get(BASE_URL);

export const fetchChosenLang = () => {
    return axios.get<Language>(`${BASE_URL}/chosen`);
};

export const updateChosenLang = (lang: Language) => {
    axios.put(`${BASE_URL}/chosen`, lang)
        .catch(err => console.error(err.response.data));
};

export const addUserLang = (lang: Language) => {
    axios.post(BASE_URL, lang)
        .catch(err => console.error(err.response.data));
};

export const removeUserLang = (lang: Language) => {
    axios.delete(BASE_URL, {params: {id: lang.id}})
        .catch(err => console.error(err.response.data));
};
