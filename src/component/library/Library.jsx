import React, {useEffect, useState} from 'react';
import {useHistory, Link, useParams} from 'react-router-dom';
import {fetchTitles, deleteTextFromDB} from "../../service/TextService";

const Library = () => {
  const {reload} = useParams();
  const history = useHistory();
  const [texts, setTexts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchTitles()
      .then(response => setTexts(response.data))
      .catch(err => console.error(err));
  }, [reload]);

  const filteredTexts = (searchQuery) => {
    return texts.filter(text => {
      return text.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleEdit = (id) => {
    history.push(`/edittext/${id}`);
  };

  const handleDelete = (id) => {
    deleteTextFromDB(id);
    setTexts(texts.filter(aText => aText.id !== id))
  };

  return (
    <div id="library">
      <div id="library-toolbar">
        <input type="text" placeholder="Search.." onKeyUp={updateQuery}/>
        <Link to={'/addtext'} id="add-text-btn">
          <i className="fas fa-plus"/>
        </Link>
      </div>
      {filteredTexts(query).map(text => (
        <div className="text-item-div" key={text.id}>
          <Link
            to={`/reading/${text.id}`}
            className="text-item-link"
            key={text.id}
          >
            {text.title}
          </Link>
          <button className="text-item-edit-btn" onClick={() => handleEdit(text.id)}>
            <i className="far fa-edit"/>
          </button>
          <button className="text-item-del-btn" onClick={() => handleDelete(text.id)}>
            <i className="fas fa-ban"/>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Library;