import React, { useEffect, useRef, useState } from 'react';
import '../../css/reading.scss';
import { Word, WordType } from '../../model/Word';
import { getUpdatedParsedText } from "../../utils/readingUtils";
import { focus } from "../../utils/webutil";
import { addWordToDB, removeWordFromDB, updateWordInDB } from "../../services/WordService";
import WordElement from "./WordElement";
import { ParsedText } from '../../model/ParsedText';
import { Token } from '../../model/Token';

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
    const focusedWord = useRef<HTMLDivElement>();
    const nextFocusMove = useRef<FocusMoveOptions | null>(null);

    const moveFocus = (moveOptions: FocusMoveOptions) => {
        const words = document.querySelectorAll('.tooltip button');
        let wordToFocus = null;
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
                        if (words[j].className === 'UNKNOWN') {
                            wordToFocus = words[j];
                        }
                    }
                }
                break;
            }
        }

        if (wordToFocus) {
            // @ts-ignore
            focus(wordToFocus);
            // @ts-ignore
            focusedWord.current = wordToFocus;
        }
    };

    const updateWordInTextAndMove = (word: Word, newType: WordType, isShiftPressed: boolean) => {
        nextFocusMove.current = !isShiftPressed ? { direction: Direction.FORWARD, skipDecided: !isShiftPressed } : null;
        const oldType = word.type;
        if (oldType === newType) {
            nextFocusMove.current && moveFocus(nextFocusMove.current);
            nextFocusMove.current = DEFAULT_FOCUS_MOVE;
        } else {
            word.type = newType;
            setEditedText(getUpdatedParsedText(editedText, word));

            if (oldType === WordType.UNKNOWN) {
                addWordToDB(word);
            } else if (newType !== WordType.UNKNOWN) {
                updateWordInDB(word);
            } else {
                removeWordFromDB(word);
            }
            // The move will happen in useEffect after finishing update and rerender
        }
    };

    const handleWordClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        focusedWord.current = event.target;
        // @ts-ignore
        return event.target.className === WordType.STUDIED.toString();
    };

    const handleWordKeyPress = (event: React.KeyboardEvent, word: Word) => {
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
                updateWordInTextAndMove(word, WordType.KNOWN, shiftPressed);
                break;
            case 83: // S
                updateWordInTextAndMove(word, WordType.STUDIED, shiftPressed);
                shouldTranslate = true;
                break;
                case 68: // D
                updateWordInTextAndMove(word, WordType.IGNORED, shiftPressed);
                break;
            case 82: // R
                updateWordInTextAndMove(word, WordType.UNKNOWN, shiftPressed);
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
