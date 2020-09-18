import React from 'react';

const LibraryItem = ({text, onClick}) => {
  return (
      <button onClick={() => onClick(text)} key={text.id}>{text.title}</button>
  );
};

export default LibraryItem;