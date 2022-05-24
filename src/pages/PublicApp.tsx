import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../css/custom.scss";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Error from "./Error";
import NotFoundPage from "./NotFoundPage";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import Signup from "./signup/Signup";

const PublicApp: React.FC = () => {
    return (
        <div id="container">
            <Router>
                <Header/>
                <Navigation/>
                <div id="content-area">
                    <Switch>
                        <Route exact path="/">
                            <Homepage/>
                        </Route>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/signup">
                            <Signup/>
                        </Route>
                        <Route path="/error">
                            <Error/>
                        </Route>
                        <Route>
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>
    );
};

export default PublicApp;
