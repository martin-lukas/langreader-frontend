import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../../css/reading.scss";
import {fetchParsedText} from "../../services/TextService";
import ReadingArea from "./ReadingArea";
import BackButton from "../library/BackButton";
import { ParsedText } from "../../model/ParsedText";
import Loader from "../common/Loader";
import {useLoader} from "../common/LoaderHook";

const ReadingPage = () => {
    const {isLoading, stopLoading} = useLoader();
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
            .catch(err => console.error(err))
            .finally(stopLoading);
        
        return () => {
            isCancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textId]);

    if (isLoading) return <Loader/>;

    return (
        <div id="reading-page">
            <BackButton to="/library"/>
            {!fetchedText && <Loader/>}
            {fetchedText && <ReadingArea text={fetchedText}/>}
        </div>
    );
};

export default ReadingPage;
