import React, { useState } from "react";
import "../../css/reading.scss";
import {Token} from "../../model/Token";
import { translateWord } from "../../services/TranslationService";
import { decodeHTMLEntities } from "../../utils/webutil";

interface WordElementProps extends React.HTMLAttributes<HTMLElement> {
    token: Token;
    onWordClick: (event: React.MouseEvent<HTMLElement>) => boolean;
    onWordKeyPress: (event: React.KeyboardEvent<HTMLElement>,  token: Token) => boolean;
}

const WordElement: React.FC<WordElementProps> = ({token, onWordClick, onWordKeyPress}) => {
    const [translation, setTranslation] = useState<string | null>(null);
    
    const handleTranslation = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        event.persist();
        if (translation) {
            showTranslation(event);
        } else {
            translateWord(token.value)
                .then((response) => {
                    setTranslation(decodeHTMLEntities(response.data).toLowerCase());
                    showTranslation(event);
                })
                .catch((err) => console.log(err.response.data));
        }
    };
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordClick(event);
        if (shouldTranslate) {
            handleTranslation(event);
        }
    };
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordKeyPress(event, token);
        if (shouldTranslate) {
            handleTranslation(event);
        }
    };

    const showTranslation = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const wordElement = target.parentElement;
        if (wordElement) {
            wordElement.className = "tooltip tooltip-toggled";
        }
    };
    
    const resetTranslationTooltips = () => {
        Array.from(document.getElementsByClassName("tooltip-toggled")).forEach(toggledTooltip => {
            toggledTooltip.className = "tooltip";
        });
    };
    
    return (
        <span className="tooltip">
            <button
                className={token.type}
                onClick={handleClick}
                onKeyUp={handleKeyPress}
            >
                {token.value}
            </button>
            <span className="tooltip-text">
                {translation}
            </span>
        </span>
    );
};

export default WordElement;