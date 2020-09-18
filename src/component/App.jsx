import React, {useEffect, useState} from 'react';
import Axios from "axios";
// import ReadingArea from "./ReadingArea";

const App = () => {
  const [helloMsg, setHelloMsg] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:8080/api/hello')
      .then(response => setHelloMsg(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1>LangReader app</h1>
      <p>{helloMsg}</p>
      {/*<p>{response}</p>*/}
    </>
  );
}

export default App;
