import axios from "../utils/axiosInstance";
import { Token } from "../model/Token";

const BASE_URL = '/words';

export const addWordToDB = (word: Token): void => {
    axios.post(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const updateWordInDB = (word: Token): void => {
    axios.put(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const removeWordFromDB = (word: Token): void => {
    axios.delete(BASE_URL, {params: {word: word.value}})
        .catch(err => console.error(err.response.data));
};
