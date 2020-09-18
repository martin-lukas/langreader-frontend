import React, {useEffect, useState} from 'react';
// import Word from "./Word";

const ReadingArea = ({parsedText}) => {
  return (
    <>
      {parsedText.map(paragraph => (
        <p>
          {paragraph.map(token => (
            <span style={(token.type) ? {border: "1px solid black"} : {}}>{token.value}</span>
          ))}
        </p>
      ))}
    </>
  );
};

export default ReadingArea;