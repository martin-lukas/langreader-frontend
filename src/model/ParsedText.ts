import { Token } from "./Token";

export interface ParsedText {
    title: string;
    paragraphs: Array<Array<Token>>;
}
