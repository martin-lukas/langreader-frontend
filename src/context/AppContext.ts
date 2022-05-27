import React, {useContext} from "react";
import {Language} from "../model/Language";
import {User} from "../model/User";

export interface AppContextType {
    allLanguages: Language[];
    setActiveUser: (user: User | undefined) => void;
    activeUser?: User;
    chosenLang?: Language;
    setChosenLang: (newChosenLang: Language) => Promise<void>;
    nativeLang?: Language;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
    const appContext = useContext(AppContext);
    // Both context and languages have to be available at this point, or there was an error somewhere.
    if (!appContext || !appContext.allLanguages)
        throw new Error(
            'No AppContext.Provider found when calling useAppContext.'
        );
    return appContext;
};