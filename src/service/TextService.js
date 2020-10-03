import axios from "../util/axiosInstance";

const BASE_URL = '/texts';

export const fetchTitles = () => axios.get(BASE_URL);

export const fetchText = (id) => axios.get(`${BASE_URL}/${id}`);

export const fetchParsedText = (id) => axios.get(`${BASE_URL}/${id}/parsed`);

export const addTextToDB = (text) => {
  axios.post(BASE_URL, text)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const updateTextInDB = (text) => {
  axios.put(BASE_URL, text)
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};

export const deleteTextFromDB = (id) => {
  axios.delete(BASE_URL, {params: {id}})
    .then(response => console.info(response.data))
    .catch(err => console.error(err.response.data));
};
