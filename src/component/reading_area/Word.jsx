import React from 'react';
import '../../asset/css/words.css';

const Word = ({word}) => {
  return (
    <a href="#" className={word.type}>
      {word.value}
    </a>
  );
};

export default Word;