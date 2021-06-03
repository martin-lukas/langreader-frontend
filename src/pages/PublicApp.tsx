import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../css/custom.scss";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Error from "./Error";
import NotFoundPage from "./NotFoundPage";
import Homepage from "./homepage/Homepage";
import { User } from "../model/User";

interface PublicAppProps {
    activeUser: User | null;
}

const PublicApp: React.FC<PublicAppProps> = ({activeUser}) => {
    return (
        <div id="container">
            <Router>
                <Header activeUser={activeUser}/>
                <Navigation activeUser={activeUser}/>
                <div id="content-area">
                    <Switch>
                        <Route exact path="/">
                            <Homepage/>
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
