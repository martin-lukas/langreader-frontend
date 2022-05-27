import React, {useContext} from "react";
import {Language} from "../model/Language";
import {User} from "../model/User";

export interface AppContextType {
    allLanguages: Language[] | null;
    setActiveUser: (user: User | undefined) => void;
    activeUser?: User;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
    const appContext = useContext(AppContext);
    if (!appContext)
        throw new Error(
            'No AppContext.Provider found when calling useAppContext.'
        );
    return appContext;
};