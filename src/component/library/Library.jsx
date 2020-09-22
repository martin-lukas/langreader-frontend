import React from 'react';
import fetchText from "../../hook/FetchTextHook";

const Library = () => {
  const texts = fetchText.titles();

  return (
    <ul>
    {texts.map(text => (
      <li key={text.id}>
        <a href={`/reading/${text.id}`}>{text.title}</a>
      </li>
    ))}
    </ul>
  );
};

export default Library;