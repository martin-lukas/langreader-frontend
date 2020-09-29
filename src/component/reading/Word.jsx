import React from 'react';
import '../../asset/css/reading.scss';

const Word = ({token, onClick, onKeyPress}) => {
  return (
    <span className="tooltip">
      <button
        className={token.type}
        onClick={(e) => onClick(e, token)}
        onKeyUp={(e) => onKeyPress(e, token)}
      >
        {token.value}
      </button>
      <span className="tooltip-text"/>
    </span>
  );
};

export default Word;