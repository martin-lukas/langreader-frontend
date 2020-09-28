import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import fetchText from "../../service/TextService";

const Library = () => {
  const [texts, setTexts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchText.titles()
      .then(response => setTexts(response.data))
      .catch(err => console.error(err));
  }, []);

  const filteredTexts = (searchQuery) => {
    return texts.filter(text => {
      return text.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div id="library">
      <div id="library-toolbar">
        <input
          type="text"
          placeholder="Search.."
          onKeyUp={updateQuery}
        />
        {/*<button id="add-text-btn" onClick={toggleAddTextForm}*/}
        {/*        className={isToggledAddText ? 'toggled' : null}>*/}
        {/*  <i className="fas fa-plus"/>*/}
        {/*</button>*/}
      </div>
      {/*<AddTextForm v-if="isToggledAddText" addText="splitTextAndAddToDB"/>*/}
      {filteredTexts(query).map(text => (
        <div className="text-item-div" key={text.id}>
          <Link
            to={`/reading/${text.id}`}
            className="text-item-link"
            key={text.id}
          >
            {text.title}
          </Link>
          <button className="text-item-edit-btn">
            <i className="far fa-edit"/>
          </button>
          <button className="text-item-del-btn">
            <i className="fas fa-ban"/>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Library;