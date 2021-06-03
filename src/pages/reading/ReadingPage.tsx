import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../../css/reading.scss";
import {fetchParsedText} from "../../services/TextService";
import ReadingArea from "./ReadingArea";
import BackButton from "../library/BackButton";
import Loader from "./Loader";
import { ParsedText } from "../../model/ParsedText";

const ReadingPage = () => {
    const {textId} = useParams<{textId: string}>();
    const [fetchedText, setFetchedText] = useState<ParsedText>();
    
    useEffect(() => {
        let isCancelled = false;
        fetchParsedText(textId)
            .then(response => {
                if (!isCancelled) {
                    setFetchedText(response.data);
                }
            })
            .catch(err => console.error(err));
        
        return () => {
            isCancelled = true;
        };
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
