import {useEffect, useState} from 'react';
import axios from "../util/axiosInstance";

const useTexts = (url) => {
  const [fetchedTexts, setFetchedTexts] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFetchedTexts(response.data);
      })
      .catch(err => {console.error(err)});
  }, [url]);

  return fetchedTexts;
};

export default useTexts;