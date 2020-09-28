import React, {useEffect, useRef, useState} from 'react';
import '../../asset/css/reading.scss';
import Word from './Word';
import {updatedText, focusOn} from "./readingUtils";
import {addWordToDB, updateWordInDB, removeWordFromDB} from "../../service/WordService";

const ReadingArea = (props) => {
  const [text, setText] = useState(props.text);
  const focusedWord = useRef();
  const nextFocusMove = useRef({allowed: false, skipDecided: true});

  const setNextFocusMove = (allowed, skipDecided) => {
    nextFocusMove.current = {allowed, skipDecided};
  };

  useEffect(() => {
    const focusMove = nextFocusMove.current;
    if (focusedWord.current && focusMove.allowed) {
      moveFocus(focusedWord.current, focusMove.skipDecided);
      setNextFocusMove(false, true);
    }
  }, [text]);

  const onWordClick = (e, word) => {
    focusedWord.current = e.target;
    // if (e.target.className === 'STUDIED') {
    // }
  };

  const onKeyPress = (e, word) => {
    switch (e.keyCode) {
      case 37:
        moveFocus(false, !e.shiftKey);
        break;
      case 39:
        moveFocus(true, !e.shiftKey);
        break;
      case 65:
        setNextFocusMove(true, !e.shiftKey);
        updateWord(word, 'KNOWN');
        break;
      case 83:
        setNextFocusMove(true, !e.shiftKey);
        updateWord(word, 'STUDIED');
        break;
      case 68:
        setNextFocusMove(true, !e.shiftKey);
        updateWord(word, 'IGNORED');
        break;
      case 82:
        updateWord(word, 'UNKNOWN');
        break;
      default:
        return;
    }
  };

  const updateWord = (word, newType) => {
    const oldType = word.type;
    if (oldType === newType) {
      if (newType !== 'UNKNOWN') {
        moveFocus(true, nextFocusMove.current.skipDecided);
      }
    } else {
      word.type = newType;
      setText(updatedText(text, word));

      if (oldType === 'UNKNOWN') {
        addWordToDB(word);
      } else if (newType !== 'UNKNOWN') {
        updateWordInDB(word);
      } else {
        removeWordFromDB(word);
      }
    }
  };

  const moveFocus = (forward, skipDecided) => {
    const current = focusedWord.current;
    const words = document.querySelectorAll('.word button');
    let wordToFocus = null;
    for (let i = 0; i < words.length; i++) {
      if (words[i] === current) {
        const startFrom = forward ? (i + 1) : (i - 1);
        if (!skipDecided) {
          wordToFocus = words[startFrom];
          break;
        } else {
          for (
            let j =  startFrom;
            (forward ? (j < words.length) : (j >= 0)) && !wordToFocus;
            forward ? j++ : j--
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
      focusOn(wordToFocus);
      focusedWord.current = wordToFocus;
    }
  };

  return (
    <div id="reading-area">
      <h3>{text.title}</h3>
      {text.paragraphs.map((paragraph, pIndex) => (
        <p key={pIndex}>
          {paragraph.map((token, tIndex) => (
            token.type
              ? <Word token={token} onClick={onWordClick} onKeyPress={onKeyPress} key={tIndex}/>
              : token.value
          ))}
        </p>
      ))}
    </div>
  );
};

export default ReadingArea;
