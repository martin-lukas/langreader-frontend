import React, {useEffect, useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {fetchTitles, deleteTextFromDB} from "../../services/TextService";
import ListItem from "./ListItem";
import {Text} from "../../model/Text";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";

const Library: React.FC = () => {
    const history = useHistory();
    const {isLoading, startLoading, stopLoading} = useLoader();

    const [texts, setTexts] = useState<Text[]>([]);
    const [query, setQuery] = useState("");
    const [noChosenLanguageYet, setNoChosenLanguageYet] = useState<boolean>(false);
    const noTextsYet = !noChosenLanguageYet && texts.length === 0;

    useEffect(() => {
        startLoading();
        fetchTitles()
            .then(response => {
                setTexts(response.data);
                setNoChosenLanguageYet(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) { // Case of not having a chosen language yet
                    setNoChosenLanguageYet(true);
                }
            })
            .finally(stopLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    const filteredTexts = (searchQuery: string) => {
        return texts.filter(text => {
            return text.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };
    
    const updateQuery = (event: any) => {
        setQuery(event.target.value);
    };
    
    const handleEdit = (text: Text) => {
        history.push(`/edittext/${text.id}`);
    };
    
    const handleDelete = (text: Text) => {
        deleteTextFromDB(text);
        setTexts(texts.filter(aText => aText.id !== text.id));
    };

    if (isLoading) return <Loader/>

    return (
        <div id="library">
            {!noChosenLanguageYet && (
                <div id="library-toolbar">
                    <input type="text" placeholder="Search.." onKeyUp={updateQuery}/>
                    <Link to={"/addtext"} id="add-text-btn">
                        <i className="fas fa-plus"/>
                    </Link>
                </div>
            )}

            {noChosenLanguageYet && (
                <div className="library-info-message">
                    <p>You haven't chosen a language to study yet. Go to <b>Manage languages</b> to choose one.</p>
                </div>
            )}

            {noTextsYet && (
                <div className="library-info-message">
                    <p>You don't have any texts in this language. Click the <b>+</b> button to add some.</p>
                </div>
            )}

            {filteredTexts(query).map(text => (
                <ListItem
                    onEdit={() => handleEdit(text)}
                    onDelete={() => handleDelete(text)}
                    key={text.id}
                >
                    <Link className="list-item-content" to={`/reading/${text.id}`}>
                        {text.title}
                    </Link>
                </ListItem>
            ))}
        </div>
    );
};

export default Library;