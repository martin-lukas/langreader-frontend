import React, {useEffect, useState} from 'react';

const AddTextForm = (onSubmit) => {
  const [isTextChosen, setTextChosen] = useState(true);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    document.getElementById('input-title').focus();
  }, []);

  const submit = () => {
    onSubmit();
  };

  const handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  const sendAddText = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      if (isTextChosen) {
        const trimmedText = title.trim();
        if (trimmedText) {
          // this.$emit('add-text', {title: trimmedTitle, text: trimmedText});
          // this.errMessage = '';
        }
      } else {
        const trimmedUrl = url.trim();
        if (trimmedUrl) {
          // ExtService.getExtResponse(trimmedUrl).then(response => {
          //   this.$emit('add-text', {title: trimmedTitle, text: response.data});
          //   this.errMessage = '';
          // }).catch(() => {
          //   this.errMessage = 'Couldn\'t parse the provided URL.';
          // });
        }
      }
    }
  };

  return (
    <div id="add-text-area">
      {/*<div id="method-btns-area">*/}
      {/*  <label>Choose method:</label>*/}
      {/*  <button className="method-btn" onClick={() => {setTextChosen(true)}}>*/}
      {/*    Text*/}
      {/*  </button>*/}
      {/*  <button className="method-btn" onClick={() => {setTextChosen(false)}}>*/}
      {/*    from URL*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label htmlFor="input-title">Title:</label>*/}
      {/*  <input type="text" id="input-title" v-model="titleInput"/>*/}
      {/*</div>*/}
      {/*<div className="lower-form-group">*/}
      {/*  <label for="input-text">{isTextChosen ? 'Text:' : 'URL:'}</label>*/}
      {/*  {isTextChosen &&*/}
      {/*  <textarea type="text" id="input-text" v-model="textInput"/>*/}
      {/*  }*/}
      {/*  {!isTextChosen &&*/}
      {/*  <input type="text" id="input-url" v-model="urlInput"/>*/}
      {/*  }*/}
      {/*</div>*/}
      {/*<div id="add-button-div">*/}
      {/*  <button onClick={submit}>Add</button>*/}
      {/*  {errMessage && <div className="error-div">{errMessage}</div>}*/}
      {/*</div>*/}
    </div>
  );
};

export default AddTextForm;