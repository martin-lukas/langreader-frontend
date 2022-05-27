import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
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
import {fetchAllLangs} from "../services/LanguageService";
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
import PublicRoute from "./PublicRoute";
import {getActiveUser, setActiveUser} from "../utils/storageUtils";

const App = () => {
    const {isLoading, stopLoading} = useLoader();

    const [allLanguages, setAllLanguages] = useState<Language[]>();

    const handleActiveUserChange = (user?: User): void => {
        setActiveUser(user);
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
                activeUser: getActiveUser(),
                setActiveUser: (user) => handleActiveUserChange(user),
            }}>
                <BrowserRouter>
                    <Header/>
                    <Navigation/>
                    <div id="content-area">
                        <Switch>
                            {/* PUBLIC */}
                            <PublicRoute exact path="/">
                                <Homepage/>
                            </PublicRoute>
                            <PublicRoute exact path="/tutorial">
                                <Tutorial/>
                            </PublicRoute>
                            <PublicRoute exact path="/login">
                                <Login/>
                            </PublicRoute>
                            <PublicRoute exact path="/signup">
                                <Signup/>
                            </PublicRoute>
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
