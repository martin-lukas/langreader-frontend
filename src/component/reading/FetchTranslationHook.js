import {useEffect, useState} from 'react';
import axios from "../../util/axiosInstance";

const TRANSLATION_URL = '/translate';

const useTranslation = (word) => {
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    if (word) {
      axios.get(`${TRANSLATION_URL}?word=${word}`)
        .then(response => {
          setTranslation(response.data.toLowerCase());
        })
        .catch(err => {
          console.error(err)
        });
    }
  }, [word]);

  return translation;
};

export default useTranslation;