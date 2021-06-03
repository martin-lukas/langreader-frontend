import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../css/custom.scss";
import { fetchChosenLang, updateChosenLang } from "../services/LanguageService";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Library from "./library/Library";
import TextForm from "./library/TextForm";
import ReadingPage from "./reading/ReadingPage";
import LanguageManagement from "./language/LanguageManagement";
import Profile from "./profile/Profile";
import Error from "./Error";
import NotFoundPage from "./NotFoundPage";
import { Language } from "../model/Language";
import { User } from "../model/User";

interface PrivateAppProps {
    activeUser: User;
}

const PrivateApp: React.FC<PrivateAppProps> = ({activeUser}) => {
    const [chosenLang, setChosenLang] = useState<Language>();

    useEffect(() => {
        fetchChosenLang()
            .then((response) => setChosenLang(response.data))
            .catch(err => console.error(err.response.data));
    }, []);

    const handleChosenLangChange = (lang: Language) => {
        updateChosenLang(lang);
        setChosenLang(lang);
    };

    return (
        <div id="container">
            {activeUser && chosenLang &&
            <Router>
                <Header activeUser={activeUser}/>
                <Navigation activeUser={activeUser}/>
                <div id="content-area">
                    <Switch>
                        <Route exact path={["/", "/library", "/library/:reload"]}>
                            <Library chosenLang={chosenLang}/>
                        </Route>
                        <Route exact path="/addtext">
                            <TextForm/>
                        </Route>
                        <Route exact path="/edittext/:textId">
                            <TextForm/>
                        </Route>
                        <Route path="/reading/:textId">
                            <ReadingPage/>
                        </Route>
                        <Route path="/languages">
                            <LanguageManagement chosenLang={chosenLang} onLanguageChange={handleChosenLangChange}/>
                        </Route>
                        <Route path="/profile">
                            <Profile/>
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
            }
        </div>
    );
};

export default PrivateApp;
