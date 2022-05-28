import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "../css/custom.scss";
import {AppContext} from "../context/AppContext";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Error from "./Error";
import NotFoundPage from "./NotFoundPage";
import Homepage from "./homepage/Homepage";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import {Language} from "../model/Language";
import {fetchAllLangs, updateChosenLang} from "../services/LanguageService";
import Library from "./library/Library";
import TextForm from "./library/TextForm";
import ReadingPage from "./reading/ReadingPage";
import LanguageManagement from "./language/LanguageManagement";
import Profile from "./profile/Profile";
import Tutorial from "./tutorial/Tutorial";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Loader from "./common/Loader";
import {useLoader} from "./common/LoaderHook";
import {User} from "../model/User";
import {loadActiveUser, loadChosenLang, loadNativeLang, storeActiveUser, storeChosenLang} from "../utils/storageUtils";
import TermsOfService from "./tos/TermsOfService";
import PrivacyPolicy from "./privacy/PrivacyPolicy";
import ContactUs from "./contact/ContactUs";

const App = () => {
    const {isLoading, stopLoading} = useLoader();

    const [allLanguages, setAllLanguages] = useState<Language[]>();
    const [chosenLang, setChosenLang] = useState<Language | undefined>(loadChosenLang());

    const handleActiveUserChange = (user?: User): void => {
        storeActiveUser(user);
    };

    const handleChosenLangChange = async (newChosenLang: Language): Promise<void> => {
        updateChosenLang(newChosenLang)
            .then(() => {
                storeChosenLang(newChosenLang);
                setChosenLang(loadChosenLang());
                return Promise.resolve();
            });
    };

    useEffect(() => {
        fetchAllLangs()
            .then((response) => {
                setAllLanguages(response.data);
            })
            .finally(stopLoading);
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

    if (!allLanguages) {
        return <Error/>;
    }

    return (
        <div id="container">
            <AppContext.Provider value={{
                allLanguages,
                activeUser: loadActiveUser(),
                setActiveUser: (user) => handleActiveUserChange(user),
                chosenLang,
                setChosenLang: (newChosenLang) => handleChosenLangChange(newChosenLang),
                nativeLang: loadNativeLang(),
            }}>
                <BrowserRouter>
                    <Header/>
                    <Navigation/>
                    <div id="content-area">
                        <Switch>
                            {/* PUBLIC */}
                            <Route exact path="/">
                                <Homepage/>
                            </Route>
                            <Route exact path="/tutorial">
                                <Tutorial/>
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                            <Route exact path="/signup">
                                <Signup/>
                            </Route>
                            <Route exact path="/contact">
                                <ContactUs/>
                            </Route>
                            <Route exact path="/tos">
                                <TermsOfService/>
                            </Route>
                            <Route exact path="/privacy">
                                <PrivacyPolicy/>
                            </Route>
                            {/* PRIVATE */}
                            <AuthenticatedRoute exact path={["/library", "/library/:reload"]}>
                                <Library/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute exact path="/addtext">
                                <TextForm/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute exact path="/edittext/:textId">
                                <TextForm/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/reading/:textId">
                                <ReadingPage/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/languages">
                                <LanguageManagement/>
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/profile">
                                <Profile/>
                            </AuthenticatedRoute>
                            {/* GENERAL */}
                            <Route path="/error">
                                <Error/>
                            </Route>
                            <Route>
                                <NotFoundPage/>
                            </Route>
                        </Switch>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
};

export default App;
