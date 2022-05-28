import * as React from "react";
import {useEffect, useState} from "react";
import classNames from "classnames";
import "../../css/language.scss";
import {addUserLang, fetchUserLangs, removeUserLang} from "../../services/LanguageService";
import ListItem from "../library/ListItem";
import {Language} from "../../model/Language";
import {useAppContext} from "../../context/AppContext";
import {useLoader} from "../common/LoaderHook";
import {existsLanguageById, getLanguageById, sortLanguages} from "../../utils/languageUtils";
import Loader from "../common/Loader";

const LanguageManagement: React.FC = () => {
    const {isLoading, startLoading, stopLoading} = useLoader();
    const {allLanguages, chosenLang, setChosenLang} = useAppContext();

    const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
    const [userLanguages, setUserLanguages] = useState<Language[]>([]);
    const [selectedLangId, setSelectedLangId] = useState<string | undefined>();

    const handleLangSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLangId(event.target.value || undefined);
    };

    const handleChosenLangChange = (event: React.MouseEvent<HTMLAnchorElement>, newChosenLang: Language) => {
        event.preventDefault();
        startLoading();
        setChosenLang(newChosenLang)
            .finally(stopLoading);
    };

    const handleAddUserLang = () => {
        if (selectedLangId) {
            const selectedLang = getLanguageById(allLanguages, Number(selectedLangId));

            if (selectedLang) {
                startLoading();
                Promise.all([
                    addUserLang(selectedLang)
                        .then(() => {
                            setUserLanguages(prevState => sortLanguages(prevState.concat(selectedLang)));
                        }),
                    // Always select the newest added user language
                    setChosenLang(selectedLang),
                ]).finally(stopLoading);
            }
        }
    };

    const handleRemoveUserLang = (langToRemove: Language) => {
        startLoading();
        removeUserLang(langToRemove).finally(stopLoading);
        setUserLanguages(userLanguages.filter(userLang => userLang.id !== langToRemove.id));
    };

    useEffect(() => {
        fetchUserLangs()
            .then(response => setUserLanguages(sortLanguages(response.data)))
            .catch(err => console.error(err))
            .finally(stopLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        const filteredLangs = allLanguages.filter(lang => !existsLanguageById(userLanguages, lang.id));
        setAvailableLanguages(filteredLangs);
    }, [allLanguages, userLanguages]);

    if (isLoading) return <Loader/>;
    
    return (
        <div id="language-page">
        {availableLanguages && (
            <select value={selectedLangId} onChange={handleLangSelectChange}>
                <option value="">Choose Language</option>

                {availableLanguages.map(lang => (
                    <option value={lang.id} key={lang.id}>
                        {lang.fullName}
                    </option>
                ))}
            </select>
        )}

        {selectedLangId && (
            <button className="add-lang-button" onClick={handleAddUserLang}>Add</button>
        )}

        {userLanguages?.map(userLang => (
            <ListItem
                cssClasses={classNames({"chosen-item": userLang.id === chosenLang?.id})}
                onDelete={(userLang.id !== chosenLang?.id) ? () => handleRemoveUserLang(userLang) : undefined}
                key={userLang.id}
            >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="list-item-content" href="" onClick={(e) => handleChosenLangChange(e, userLang)}>
                    {userLang.fullName}
                </a>
            </ListItem>
        ))}
        </div>
    );
};

export default LanguageManagement;
