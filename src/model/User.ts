import { Language } from "./Language";

export interface User {
    id: string;
    username: string;
    chosenLang: Language;
    nativeLang: Language;
}