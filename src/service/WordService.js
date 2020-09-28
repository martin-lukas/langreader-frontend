import axios from "../util/axiosInstance";

export const addWordToDB = (word) => {
  axios.post('/words', word)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const updateWordInDB = (word) => {
  axios.put('/words', word)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const removeWordFromDB = (word) => {
  axios.delete('/words', {params: {word: word.value}})
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

