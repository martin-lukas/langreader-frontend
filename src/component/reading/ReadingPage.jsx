import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../asset/css/reading.scss';
import {fetchParsedText} from "../../service/TextService";
import ReadingArea from "./ReadingArea";
import BackButton from "../common/BackButton";

const ReadingPage = () => {
  const {textId} = useParams();
  const [fetchedText, setFetchedText] = useState();

  useEffect(() => {
    let isCancelled = false;
    fetchParsedText(textId)
      .then(response => {
        if (!isCancelled) {
          setFetchedText(response.data);
        }
      })
      .catch(err => console.error(err));

    return () => {isCancelled = true};
  }, [textId]);

  return (
    <div id="reading-page">
      <BackButton to="/library"/>
      {!fetchedText && <Loader/>}
      {fetchedText && <ReadingArea text={fetchedText}/>}
    </div>
  );
};

export default ReadingPage;

const Loader = () => {
  return (
    <div id="loading-div">
      <h3>Loading...</h3>
    </div>
  );
};
