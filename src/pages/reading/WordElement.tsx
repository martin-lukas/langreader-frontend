import React from 'react';
import '../../css/reading.scss';
import useTranslation from "../../hooks/TranslationHook";
import {Token} from "../../model/Token";

interface WordElementProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Token;
    onWordClick: (event: React.MouseEvent, token: Token) => boolean;
    onWordKeyPress: (event: React.KeyboardEvent,  token: Token) => boolean;
}

const WordElement: React.FC<WordElementProps> = ({token, onWordClick, onWordKeyPress}) => {
    const [translation, translate] = useTranslation(token.value);
    
    const handleTranslation = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.persist();
        if (translation) {
            showTranslation(event);
        } else {
            translate && translate(() => showTranslation(event));
        }
    };
    
    const handleClick = (event: React.MouseEvent) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordClick(event, token);
        if (shouldTranslate) {
            handleTranslation(event);
        }
    };
    
    const handleKeyPress = (event: React.KeyboardEvent) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordKeyPress(event, token);
        if (shouldTranslate) {
            handleTranslation(event);
        }
    };

    const showTranslation = (event: React.MouseEvent | React.KeyboardEvent) => {
        const toggledClassName = 'tooltip tooltip-toggled';
        // @ts-ignore
        const wordElement = event.target.parentElement;
        wordElement.className = toggledClassName;
    };
    
    const resetTranslationTooltips = () => {
        Array.from(document.getElementsByClassName('tooltip-toggled')).forEach(toggledTooltip => {
            toggledTooltip.className = 'tooltip';
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
                {(translation as any)?.toLowerCase()}
            </span>
        </span>
    );
};

export default WordElement;