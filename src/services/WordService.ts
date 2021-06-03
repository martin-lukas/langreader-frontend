import { Token } from "../model/Token";
import axios from "./axiosInstance";

const BASE_URL = '/words';

export const addWordToDB = (word: Token) => {
    axios.post(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const updateWordInDB = (word: Token) => {
    axios.put(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const removeWordFromDB = (word: Token) => {
    axios.delete(BASE_URL, {params: {word: word.value}})
        .catch(err => console.error(err.response.data));
};
