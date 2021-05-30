import React from 'react';
import '../../css/reading.scss';
import useTranslation from "../../hooks/TranslationHook";
import {Token} from "../../model/Token";

interface WordElementProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Token;
    onWordClick: (event: any, token: any) => boolean;
    onWordKeyPress: (event: any,  word: any) => boolean;
}

const WordElement: React.FC<WordElementProps> = ({token, onWordClick, onWordKeyPress}) => {
    const [translation, translate] = useTranslation(token.value);
    
    const showTranslation = (event: any) => {
        const toggledClassName = 'tooltip tooltip-toggled';
        const wordElement = event.target.parentElement;
        wordElement.className = toggledClassName;
    };
    
    const resetTranslationTooltips = () => {
        Array.from(document.getElementsByClassName('tooltip-toggled')).forEach(toggledTooltip => {
            toggledTooltip.className = 'tooltip';
        });
    };
    
    const handleTranslation = (event: any) => {
        event.persist();
        if (translation) {
            showTranslation(event);
        } else {
            if (translate) translate(() => showTranslation(event));
        }
    };
    
    const handleClick = (event: React.MouseEvent) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordClick(event, token);
        if (shouldTranslate) handleTranslation(event);
    };
    
    const handleKeyPress = (event: React.KeyboardEvent) => {
        resetTranslationTooltips();
        const shouldTranslate = onWordKeyPress(event, token);
        if (shouldTranslate) handleTranslation(event);
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