import React, {useState} from 'react';
import Menu from "./Menu";
import Library from './library/Library';
// import ReadingArea from "./reading_area/ReadingArea";

const App = () => {
  const [page, setPage] = useState('');
  const [openedText, setOpenedText] = useState();

  const changePage = (page) => {
    setPage(page);
  };

  const openText = (text) => {
    setPage('ReadingArea');
    setOpenedText(text);
  };

  return (
    <>
      <h1>LangReader app</h1>
      <Menu onItemClick={changePage}/>
      {page === 'Library' &&
      <Library onTextClick={openText}/>
      }
      {page === 'ReadingArea' &&
      <p>{openedText.title}</p>
      // <ReadingArea text={openedText}/>
      }
    </>
  );
}

export default App;
