import { Word } from "../model/Word";
import { Token } from "../model/Token";
import { ParsedText } from "../model/ParsedText";

export const getUpdatedParsedText = (originalText: ParsedText, updatedWord: Word): ParsedText => {
    const newText = { ...originalText };
    newText.paragraphs.forEach((paragraph: Token[]) => {
        paragraph.forEach((token: Token) => {
            if (token.type && token.value.toLowerCase() === updatedWord.value.toLowerCase()) {
                token.type = updatedWord.type;
            }
        });
    });
    return newText;
};
