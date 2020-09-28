import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Library from './library/Library';
import NotFoundPage from "./NotFoundPage";
import ReadingPage from "./reading/ReadingPage";
import TopNavigation from "./navigation/TopNavigation";

const App = () => {
  return (
    <Router>
      <div id="container">
        <Header/>
        <TopNavigation/>
        <div id="content-area">
          <Switch>
            <Route exact path={["/", "/library"]}>
              <Library/>
            </Route>
            <Route path="/reading/:textId">
              <ReadingPage/>
            </Route>
            <Route path="/about">
              This is about
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
