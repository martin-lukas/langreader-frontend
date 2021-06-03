import { Token } from "../model/Token";
import { ParsedText } from "../model/ParsedText";

export const getUpdatedParsedText = (originalText: ParsedText, updatedToken: Token): ParsedText => {
    const newText = { ...originalText };
    newText.paragraphs.forEach((paragraph: Token[]) => {
        paragraph.forEach((token: Token) => {
            if (token.type && token.value.toLowerCase() === updatedToken.value.toLowerCase()) {
                token.type = updatedToken.type;
            }
        });
    });
    return newText;
};
