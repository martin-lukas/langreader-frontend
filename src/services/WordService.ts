import axios from "./axiosInstance";
import {Word} from "../model/Word";

const BASE_URL = '/words';

export const addWordToDB = (word: Word) => {
    axios.post(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const updateWordInDB = (word: Word) => {
    axios.put(BASE_URL, word)
        .catch(err => console.error(err.response.data));
};

export const removeWordFromDB = (word: Word) => {
    axios.delete(BASE_URL, {params: {word: word.value}})
        .catch(err => console.error(err.response.data));
};
