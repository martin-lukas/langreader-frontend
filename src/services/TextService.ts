import axios from "./axiosInstance";
import {Text} from '../model/Text';

const BASE_URL = '/texts';

export const fetchTitles = () => axios.get(BASE_URL);

export const fetchText = (id: string) => axios.get(`${BASE_URL}/${id}`);

export const fetchParsedText = (id: string) => axios.get(`${BASE_URL}/${id}/parsed`);

export const addTextToDB = (text: Text, callback?: () => void) => {
  axios.post(BASE_URL, text)
    .then(response => {
      callback && callback();
    })
    .catch(err => console.error(err.response.data));
};

export const updateTextInDB = (text: Text, callback?: () => void) => {
  axios.put(BASE_URL, text)
    .then(response => {
      callback && callback();
    })
    .catch(err => console.error(err.response.data));
};

export const deleteTextFromDB = (text: Text) => {
  axios.delete(BASE_URL, {params: {id: text.id}})
    .catch(err => console.error(err.response.data));
};
