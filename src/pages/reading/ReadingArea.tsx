import React, { useEffect, useRef, useState } from "react";
import "../../css/reading.scss";
import { TokenType } from "../../model/TokenType";
import { getUpdatedParsedText } from "../../utils/readingUtils";
import { focus } from "../../utils/webutil";
import { addWordToDB, removeWordFromDB, updateWordInDB } from "../../services/WordService";
import WordElement from "./WordElement";
import { ParsedText } from "../../model/ParsedText";
import { Token } from "../../model/Token";

interface ReadingAreaProps {
    text: ParsedText;
}

interface FocusMoveOptions {
    direction: Direction;
    skipDecided: boolean;
}

enum Direction {
    FORWARD = 1,
    BACKWARD = -1
}

const DEFAULT_FOCUS_MOVE = { direction: Direction.FORWARD, skipDecided: true };

const ReadingArea: React.FC<ReadingAreaProps> = ({ text }) => {
    const [editedText, setEditedText] = useState<ParsedText>(text);
    const focusedWord = useRef<HTMLElement>();
    const nextFocusMove = useRef<FocusMoveOptions | null>(null);

    const moveFocus = (moveOptions: FocusMoveOptions) => {
        const words: NodeListOf<HTMLElement> = document.querySelectorAll(".tooltip button");
        let wordToFocus: HTMLElement | null = null;
        for (let i = 0; i < words.length; i++) {
            if (words[i] === focusedWord.current) {
                const startFrom = i + moveOptions.direction;
                if (!moveOptions.skipDecided) {
                    wordToFocus = words[startFrom];
                    break;
                } else {
                    for (
                        let j = startFrom;
                        (moveOptions.direction === Direction.FORWARD
                            ? (j < words.length)
                            : (j >= 0)
                            ) && !wordToFocus;
                        j = j + moveOptions.direction
                    ) {
                        if (words[j].className === TokenType.UNKNOWN) {
                            wordToFocus = words[j];
                        }
                    }
                }
                break;
            }
        }

        if (wordToFocus) {
            focus(wordToFocus);
            focusedWord.current = wordToFocus;
        }
    };

    const updateWordInTextAndMove = (token: Token, newType: TokenType, isShiftPressed: boolean) => {
        nextFocusMove.current = !isShiftPressed ? { direction: Direction.FORWARD, skipDecided: !isShiftPressed } : null;
        const oldType = token.type;
        if (oldType === newType) {
            nextFocusMove.current && moveFocus(nextFocusMove.current);
            nextFocusMove.current = DEFAULT_FOCUS_MOVE;
        } else {
            token.type = newType;
            setEditedText(getUpdatedParsedText(editedText, token));

            if (oldType === TokenType.UNKNOWN) {
                addWordToDB(token);
            } else if (newType !== TokenType.UNKNOWN) {
                updateWordInDB(token);
            } else {
                removeWordFromDB(token);
            }
            // The move will happen in useEffect after finishing update and rerender
        }
    };

    const handleWordClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        focusedWord.current = target;
        return target.className === TokenType.STUDIED;
    };

    const handleWordKeyPress = (event: React.KeyboardEvent<HTMLElement>, token: Token) => {
        let shouldTranslate = false;
        const shiftPressed = event.shiftKey;
        
        switch (event.keyCode) {
            case 37: // <-
                moveFocus({ direction: Direction.BACKWARD, skipDecided: !shiftPressed });
                break;
            case 39: // ->
                moveFocus({ direction: Direction.FORWARD, skipDecided: !shiftPressed });
                break;
            case 65: // A
                updateWordInTextAndMove(token, TokenType.KNOWN, shiftPressed);
                break;
            case 83: // S
                updateWordInTextAndMove(token, TokenType.STUDIED, shiftPressed);
                shouldTranslate = true;
                break;
                case 68: // D
                updateWordInTextAndMove(token, TokenType.IGNORED, shiftPressed);
                break;
            case 82: // R
                updateWordInTextAndMove(token, TokenType.UNKNOWN, shiftPressed);
                break;
            default:
                break;
        }

        return shouldTranslate;
    };

    useEffect(() => {
        if (focusedWord.current && nextFocusMove.current) {
            moveFocus(nextFocusMove.current);
        }
        nextFocusMove.current = DEFAULT_FOCUS_MOVE;
    }, [editedText]);

    return (
        <div id="reading-area">
            <h3>{editedText.title}</h3>
            {editedText.paragraphs.map((paragraph: Token[], pIndex: number) => (
                <p key={pIndex}>
                    {paragraph.map((token: Token, tIndex: number) => (
                        token.type
                            ? <WordElement
                                token={token}
                                onWordClick={handleWordClick}
                                onWordKeyPress={handleWordKeyPress}
                                key={tIndex}
                            />
                            : token.value
                    ))}
                </p>
            ))}
        </div>
    );
};

export default ReadingArea;
