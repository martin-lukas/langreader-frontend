import { Language } from "./Language";

export interface User {
    id: string;
    username: string;
    password: string;
    chosenLang: Language;
    nativeLang: Language;
}