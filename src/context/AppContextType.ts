import React from "react";
import {Language} from "../model/Language";

export interface AppContextType {
    allLanguages: Language[] | null;
}

export const AppContext = React.createContext<AppContextType>({
    allLanguages: null,
});