import React from 'react';

const Menu = ({onItemClick}) => {
  const pages = ['Library', 'Test'];
  return (
    <ul>
      {pages.map((page, index) => (
        <li key={index}>
          <button onClick={() => onItemClick(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;