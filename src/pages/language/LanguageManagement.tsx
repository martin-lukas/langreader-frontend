import * as React from 'react';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import '../../css/language.scss';
import {addUserLang, fetchAllLangs, fetchUserLangs, removeUserLang} from "../../services/LanguageService";
import ListItem from "../library/ListItem";
import {Language} from "../../model/Language";

interface LanguageManagementProps {
    chosenLang: Language;
    onLanguageChange: (lang: Language) => void;
}

const LanguageManagement: React.FC<LanguageManagementProps> = ({chosenLang, onLanguageChange}) => {
    const [allLangs, setAllLangs] = useState<Language[]>([]);
    const [userLangs, setUserLangs] = useState<Language[]>([]);
    const [selectedLangId, setSelectedLangId] = useState<string | undefined>();
    
    const setUserLangsSorted = (langs: Language[]) => {
        langs.sort((a, b) => (a.fullName).localeCompare(b.fullName, "en"));
        setUserLangs(langs);
    };

    const handleLangSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLangId(event.target.value || undefined);
    };

    const handleAddUserLang = () => {
        if (selectedLangId) {
            // eslint-disable-next-line eqeqeq
            const selectedLang = allLangs.find(lang => lang.id == selectedLangId);
            
            if (selectedLang) {
                addUserLang(selectedLang);
                setUserLangsSorted(userLangs.concat(selectedLang));
            }
        }
    };
    
    const handleRemoveUserLang = (langToRemove: Language) => {
        removeUserLang(langToRemove);
        setUserLangs(userLangs.filter(userLang => userLang.id !== langToRemove.id));
    };

    useEffect(() => {
        fetchAllLangs()
            .then(({data}) => setAllLangs(data))
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        fetchUserLangs()
            .then(response => {
                setUserLangsSorted(response.data);
            })
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
        const isInUserLangs = (langId: string) => userLangs.map(userLang => userLang.id).indexOf(langId) === -1;
        const filteredLangs = allLangs.filter(lang => isInUserLangs(lang.id));
        setAllLangs(filteredLangs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLangs]);
    
    return (
        <div id="language-page">
        {allLangs &&
        <select value={selectedLangId} onChange={handleLangSelectChange}>
            <option value="">
                Choose Language
            </option>

            {allLangs.map(lang => (
                <option value={lang.id} key={lang.id}>
                    {lang.fullName}
                </option>
            ))}
        </select>
        }

        {selectedLangId &&
        <button className="add-lang-button" onClick={handleAddUserLang}>
            Add
        </button>
        }

        {userLangs &&
        userLangs.map(userLang => (
            <ListItem
                key={userLang.id}
                cssClasses={classNames({
                    'chosen-item': userLang.id === chosenLang.id
                })}
                onDelete={userLang.id !== chosenLang.id && (() => handleRemoveUserLang(userLang))}
            >
                {/* TODO: rework so this is a button and not a link */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="list-item-content"
                    href="#"
                    onClick={() => onLanguageChange(userLang)}
                >
                    {userLang.fullName}
                </a>
            </ListItem>
        ))
        }
        </div>
    );
};

export default LanguageManagement;