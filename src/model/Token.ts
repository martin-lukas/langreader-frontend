import {WordType} from "./Word";

export interface Token {
    type: WordType;
    value: string;
}