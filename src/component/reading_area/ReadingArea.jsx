import React from 'react';
import fetchText from "../../hook/FetchTextHook";
// import Word from "./Word";

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
            {paragraph.map((token, index) => (
              <span style={{border: token.type ? "1px solid black" : "none"}} key={index}>{token.value}</span>
            ))}
          </p>
        ))}
      </>
      }
    </>
  );
};

export default ReadingArea;