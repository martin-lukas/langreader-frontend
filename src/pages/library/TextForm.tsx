import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import BackButton from "./BackButton";
import {addTextToDB, fetchText, updateTextInDB} from "../../services/TextService";
import {focusById} from "../../utils/webutil";
import { Text } from "../../model/Text";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";

const TextForm = () => {
    const {isLoading, stopLoading} = useLoader();
    const {textId} = useParams<{textId: string}>();
    const history = useHistory();
    const [fields, setFields] = useState({title: "", text: ""});
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (textId) {
            let isCancelled = false;
            fetchText(textId)
                .then(response => {
                    if (!isCancelled) {
                        const fetchedText = response.data;
                        setFields({...fields, title: fetchedText.title, text: fetchedText.text});
                    }
                })
                .catch(err => console.error(err))
                .finally(stopLoading);
            
            return () => {
                isCancelled = true;
            }
        }
        
        focusById("input-title");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textId]);
    
    const validate = (formData: {title: string, text: string}) => {
        let errorMsg = "";
        errorMsg = errorMsg + (formData.title.trim() ? "" : "Title can't be empty. ");
        errorMsg = errorMsg + (formData.text.trim() ? "" : "Text can't be empty. ");
        setError(errorMsg);
        return !errorMsg;
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFields({...fields, [event.target.name]: event.target.value});
    };
    
    const handleSubmit = () => {
        if (validate(fields)) {
            const text: Text = {id: textId, title: fields.title, text: fields.text};
            const apiCall = textId ? updateTextInDB : addTextToDB;
            apiCall(text, () => history.push("/library"));
        }
    };

    if (isLoading) return <Loader/>;

    return (
        <div id="add-text-area">
            <BackButton to="/library"/>
            <h2>Add new text</h2>
            <div className="add-text-form">
                <div>
                    <label htmlFor="input-title">Title:</label>
                    <input name="title" type="text" id="input-title" onChange={handleChange} defaultValue={fields.title}/>
                </div>
                <div className="lower-form-group">
                    <label htmlFor="input-text">Text:</label>
                    <textarea id="input-text" name="text" onChange={handleChange} defaultValue={fields.text}/>
                </div>
                <div id="add-button-div">
                    <button onClick={handleSubmit}>{textId ? "Update" : "Add"}</button>
                    {error && <div className="error-div">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default TextForm;