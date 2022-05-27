import {Language} from "../model/Language";

export const getLanguageById = (langs: Language[], id: number): Language | undefined => {
    return langs.find((lang) => lang.id === id);
};

export const existsLanguageById = (langs: Language[], id: number): boolean => {
    return langs.some((lang) => lang.id === id);
};

export const sortLanguages = (langs: Language[]): Language[] => {
    return langs.sort((a, b) => (a.fullName).localeCompare(b.fullName, "en"));
};