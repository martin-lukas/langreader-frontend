import {useEffect, useState} from 'react';
import axios from "../util/axiosInstance";

const BASE_URL = '/texts';

const useTitles = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => {
        setTitles(response.data);
      })
      .catch(err => {
        console.error(err)
      });
    }, []);

  return titles;
};

const useText = (id) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/${id}`)
      .then(response => {
        setText(response.data);
      })
      .catch(err => {
        console.error(err)
      });
  }, [id]);

  return text;
};

const useParsedText = (id) => {
  const [parsedText, setParsedText] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/${id}/parsed`)
      .then(response => {
        setParsedText(response.data);
      })
      .catch(err => {
        console.error(err)
      });
  }, [id]);

  return parsedText;
};

export default {
  titles: useTitles,
  byId: useText,
  parsedById: useParsedText
};