import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../asset/css/reading.scss';
import fetchText from "../../service/TextService";
import ReadingArea from "./ReadingArea";

const ReadingPage = () => {
  const {textId} = useParams();
  const [fetchedText, setFetchedText] = useState();

  useEffect(() => {
    fetchText.parsedById(textId)
      .then(response => setFetchedText(response.data))
      .catch(err => console.error(err));
  }, [textId]);

  return (
    <div id="reading-page">
      <BackButton/>
      {!fetchedText && <Loader/>}
      {fetchedText && <ReadingArea text={fetchedText}/>}
    </div>
  );
};

export default ReadingPage;

const BackButton = () => {
  return (
    <Link to="/library" id="back-button">
      <i className="far fa-arrow-alt-circle-left"/>
    </Link>
  );
};

const Loader = () => {
  return (
    <div id="loading-div">
      <h3>Loading...</h3>
    </div>
  );
};
