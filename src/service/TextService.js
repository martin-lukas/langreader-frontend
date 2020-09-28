import axios from "../util/axiosInstance";

const BASE_URL = '/texts';

const fetchTitles = () => axios.get(BASE_URL);

const fetchText = (id) => axios.get(`${BASE_URL}/${id}`);

const fetchParsedText = (id) => axios.get(`${BASE_URL}/${id}/parsed`);

export default {
  titles: fetchTitles,
  byId: fetchText,
  parsedById: fetchParsedText
};