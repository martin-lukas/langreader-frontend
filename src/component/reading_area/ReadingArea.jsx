import React from 'react';
import fetchText from "../../hook/FetchTextHook";
import Word from "./Word";
import '../../asset/css/reading.css';

const ReadingArea = ({textId}) => {
  /**
   * @type {Object}
   * @property {Array} paragraphs[]
   */
  const parsedText = fetchText.parsedById(textId);

  return (
    <>
      {!parsedText &&
      <h2>Loading...</h2>
      }
      {parsedText &&
      <>
        <h2>{parsedText.title}</h2>
        {parsedText.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph.map((token, index) => {
              return (token.type)
                ? <Word word={token} key={index}/>
                : <>{token.value}</>;
            })
            }
          </p>
        ))}
      </>
      }
    </>
  );
};

export default ReadingArea;