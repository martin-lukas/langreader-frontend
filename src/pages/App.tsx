import React, {useEffect, useState} from "react";
import "../css/custom.scss";
import {fetchActiveUser} from "../services/UserService";
import {User} from "../model/User";
import {AppContext} from "../context/AppContextType";
import PrivateApp from "./PrivateApp";
import PublicApp from "./PublicApp";
import {Language} from "../model/Language";
import {fetchAllLangs} from "../services/LanguageService";

const App = () => {
    const [activeUser, setActiveUser] = useState<User | null>();
    const [allLanguages, setAllLanguages] = useState<Language[]>();

    useEffect(() => {
        fetchAllLangs()
            .then((response) => {
                setAllLanguages(response.data);
            });
        fetchActiveUser()
            .then((response) => {
                setActiveUser(response.data);
            })
            .catch(() => {
                setActiveUser(null);
            });
    }, []);

    return (
        <>
            {!!allLanguages && activeUser !== undefined && (
                <AppContext.Provider value={{allLanguages}}>
                    {activeUser !== null
                        ? <PrivateApp activeUser={activeUser}/>
                        : <PublicApp/>
                    }
                </AppContext.Provider>
            )}
        </>
    );
};

export default App;
