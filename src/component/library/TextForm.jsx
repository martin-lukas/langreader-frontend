import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {getRandomString} from '../../util/random';
import BackButton from "../common/BackButton";
import {addTextToDB, fetchText, updateTextInDB} from "../../service/TextService";

const TextForm = () => {
  const {textId} = useParams();
  const history = useHistory();
  const [fields, setFields] = useState({title: '', text: ''});
  const [error, setError] = useState('');

  useEffect(() => {
    if (textId) {
      let isCancelled = false;
      fetchText(textId)
        .then(response => {
          if (!isCancelled) {
            const fetchedText = response.data;
            setFields({...fields, title: fetchedText.title, text: fetchedText.text});
          }
        })
        .catch(err => console.error(err));

      return () => {isCancelled = true};
    }
  }, []);

  const validate = (formData) => {
    let errorMsg = '';
    errorMsg = errorMsg + (formData.title.trim() ? '' : 'Title can\'t be empty. ');
    errorMsg = errorMsg + (formData.text.trim() ? '' : 'Text can\'t be empty. ');
    setError(errorMsg);
    return !errorMsg;
  };

  const handleChange = (event) =>{
    setFields({...fields, [event.target.name]: event.target.value});
  };

  const handleSubmit = () => {
    if (validate(fields)) {
      const text = {id: textId, title: fields.title, text: fields.text};
      textId ? updateTextInDB(text) : addTextToDB(text);
      history.push(`/library/${getRandomString()}`);
    }
  };

  return (
    <div id="add-text-area">
      <BackButton to="/library"/>
      <h2>Add new text</h2>
      <div className="add-text-form">
        <div>
          <label htmlFor="input-title">Title:</label>
          <input name="title" type="text" id="input-title" onChange={handleChange} value={fields.title}/>
        </div>
        <div className="lower-form-group">
          <label htmlFor="input-text">Text:</label>
          <textarea id="input-text" name="text" onChange={handleChange} value={fields.text}/>
        </div>
        <div id="add-button-div">
          <button onClick={handleSubmit}>{textId ? 'Update' : 'Add'}</button>
          {error && <div className="error-div">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default TextForm;