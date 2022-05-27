import axios from "../utils/axiosInstance";
import { Token } from "../model/Token";
import {getBasicAuthenticationConfig} from "../utils/authUtils";

const BASE_URL = "/words";

export const addWordToDB = (word: Token): void => {
    axios.post(BASE_URL, word, getBasicAuthenticationConfig())
        .catch(err => console.error(err.response));
};

export const updateWordInDB = (word: Token): void => {
    axios.put(BASE_URL, word, getBasicAuthenticationConfig())
        .catch(err => console.error(err.response));
};

export const removeWordFromDB = (word: Token): void => {
    axios.delete(BASE_URL, {
        params: {word: word.value},
        ...getBasicAuthenticationConfig()
    }).catch(err => console.error(err.response));
};
