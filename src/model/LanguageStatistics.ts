import {Language} from "./Language";

export interface LanguageStatistics {
    language: Language;
    knownCount: number;
    studiedCount: number;
    ignoredCount: number;
}