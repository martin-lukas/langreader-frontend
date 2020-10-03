import axios from "../util/axiosInstance";

const BASE_URL = '/words';

export const addWordToDB = (word) => {
  axios.post(BASE_URL, word)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const updateWordInDB = (word) => {
  axios.put(BASE_URL, word)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const removeWordFromDB = (word) => {
  axios.delete(BASE_URL, {params: {word: word.value}})
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

