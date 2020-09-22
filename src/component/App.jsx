import React from 'react';
import {useRoutes, useRedirect} from 'hookrouter';
import Library from './library/Library';
import NotFoundPage from "./NotFoundPage";
import ReadingArea from "./reading_area/ReadingArea";

const routes = {
  '/library': () => <Library/>,
  '/reading/:id': ({id}) => <ReadingArea textId={id}/>
};

const App = () => {
  useRedirect('/', '/library');
  const routeResult = useRoutes(routes);

  return (
    <>
      <h1>LangReader app</h1>
      <hr/>
      <ul>
        <li>
          <a href={"/library"}>Library</a>
        </li>
      </ul>
      <hr/>
      {routeResult || <NotFoundPage/>}
    </>
  );
}

export default App;
