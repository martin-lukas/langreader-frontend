import React from 'react';
import useTexts from "../../hook/FetchHook";
import LibraryItem from "./LibraryItem";

const Library = ({onTextClick}) => {
  const texts = useTexts('/texts');

  return (
    <>
      {texts.map(text => (
        <LibraryItem text={text} onClick={onTextClick} key={text.id}/>
      ))}
    </>
  );
};

export default Library;