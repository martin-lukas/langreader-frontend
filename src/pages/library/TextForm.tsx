import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "./BackButton";
import {addTextToDB, addTextToDBFromUrl, fetchText, updateTextInDB} from "../../services/TextService";
import {focusById} from "../../utils/webutil";
import { Text } from "../../model/Text";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";
import {TextFromUrlRequest} from "../../model/TextFromUrlRequest";

enum TextSource {INPUT, URL}

interface TextFormFields {
    source: TextSource;
    title: string;
    text: string;
    url: string;
}

const FIELDS_DEFAULT: TextFormFields = {
    source: TextSource.INPUT,
    title: "",
    text: "",
    url: "",
};

const TextForm = () => {
    const {isLoading, startLoading, stopLoading} = useLoader(false);
    const {textId} = useParams<{textId: string}>();
    const navigate = useNavigate();

    const [fields, setFields] = useState<TextFormFields>(FIELDS_DEFAULT);
    const [errorMessage, setErrorMessage] = useState("");

    const trimFields = (fields: TextFormFields): TextFormFields => {
        return {
            ...fields,
            title: fields.title.trim(),
            text: fields.text.trim(),
            url: fields.url.trim(),
        };
    };

    const validate = (formData: TextFormFields): boolean => {
        let errorMsg = "";

        if (!formData.title) errorMsg = "Title can't be empty.";
        else if (formData.source === TextSource.INPUT) {
            if (!formData.text) errorMsg = "Text can't be empty";
        } else {
            if (!formData.url) errorMsg = "URL can't be empty";
        }
        setErrorMessage(errorMsg);
        return !errorMsg;
    };
    
    const handleChange = (name: string, value: string | TextSource) => {
        setFields({...fields, [name]: value});
    };

    const handleSourceChange = (newSource: TextSource) => {
        handleChange("source", newSource);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChange(event.target.name, event.target.value);
    };
    
    const handleSubmit = () => {
        const trimmedFields = trimFields(fields);

        if (validate(trimmedFields)) {
            const callback = () => navigate("/library");

            if (textId) {
                const text: Text = {id: textId, title: trimmedFields.title, text: trimmedFields.text};
                updateTextInDB(text, callback);
            } else {
                if (trimmedFields.source === TextSource.INPUT) {
                    const text: Text = {title: trimmedFields.title, text: trimmedFields.text};
                    addTextToDB(text, callback);
                } else {
                    const request: TextFromUrlRequest = {title: trimmedFields.title, url: trimmedFields.url};
                    addTextToDBFromUrl(request, callback);
                }
            }
        }
    };

    useEffect(() => {
        if (textId) {
            let isCancelled = false;
            startLoading();
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

    if (isLoading) return <Loader/>;

    return (
        <div id="add-text-area">
            <BackButton to="/library"/>
            <h2>Add new text</h2>
            <div className="add-text-form">
                <div id="method-btns-area">
                    <label>Choose method:</label>
                    <button className="method-btn" onClick={() => handleSourceChange(TextSource.INPUT)}>Text</button>
                    <button className="method-btn" onClick={() => handleSourceChange(TextSource.URL)}>from URL</button>
                </div>
                <div>
                    <label htmlFor="input-title">Title:</label>
                    <input name="title" type="text" id="input-title" value={fields.title} onChange={handleInputChange}/>
                </div>
                <div className="lower-form-group">
                    {fields.source === TextSource.INPUT
                        ? (
                            <>
                                <label htmlFor="input-text">Text:</label>
                                <textarea
                                    id="input-text"
                                    name="text"
                                    value={fields.text}
                                    onChange={handleInputChange}
                                />
                            </>
                        ) : (
                            <>
                                <label htmlFor="input-text">URL:</label>
                                <input
                                    type="text"
                                    id="input-url"
                                    name="url"
                                    value={fields.url}
                                    onChange={handleInputChange}
                                />
                            </>
                        )
                    }
                </div>
                <div id="add-button-div">
                    <button onClick={handleSubmit}>{textId ? "Update" : "Add"}</button>
                    {errorMessage && <div className="error-div">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default TextForm;