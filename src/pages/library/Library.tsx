import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {fetchTitles, deleteTextFromDB} from "../../services/TextService";
import ListItem from "./ListItem";
import {Text} from '../../model/Text';
import { Language } from '../../model/Language';

interface LibraryProps {
    chosenLang: Language;
}

const Library: React.FC<LibraryProps> = ({chosenLang}) => {
    const history = useHistory();
    const [texts, setTexts] = useState<Text[]>([]);
    const [query, setQuery] = useState("");
    
    useEffect(() => {
        fetchTitles()
            .then(response => setTexts(response.data))
            .catch(err => console.error(err));
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
    
    return (
        <div id="library">
            <div id="library-toolbar">
                <input type="text" placeholder="Search.." onKeyUp={updateQuery}/>
                <Link to={'/addtext'} id="add-text-btn">
                    <i className="fas fa-plus"/>
                </Link>
            </div>
            
            {filteredTexts(query).map(text => (
                <ListItem onEdit={() => handleEdit(text)} onDelete={() => handleDelete(text)} key={text.id}>
                    <Link className="list-item-content" to={`/reading/${text.id}`}>
                        {text.title}
                    </Link>
                </ListItem>
            ))}
        </div>
    );
};

export default Library;