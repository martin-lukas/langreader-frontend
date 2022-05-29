import React, {useEffect, useState} from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();

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
            .then((response) => setAllLanguages(response.data))
            .catch(() => navigate("/error"))
            .finally(stopLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Header/>
                    <Navigation/>
                    <div id="content-area">
                        <Routes>
                            {/* PUBLIC */}
                            <Route path="/" element={<Homepage/>}/>
                            <Route path="/tutorial" element={<Tutorial/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/contact" element={<ContactUs/>}/>
                            <Route path="/tos" element={<TermsOfService/>}/>
                            <Route path="/privacy" element={<PrivacyPolicy/>}/>
                            {/* PRIVATE */}
                            <Route path={"/library"} element={
                                <AuthenticatedRoute>
                                    <Library/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path={"/library/:reload"} element={
                                <AuthenticatedRoute>
                                    <Library/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/addtext" element={
                                <AuthenticatedRoute>
                                    <TextForm/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/edittext/:textId" element={
                                <AuthenticatedRoute>
                                    <TextForm/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/reading/:textId" element={
                                <AuthenticatedRoute>
                                    <ReadingPage/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/languages" element={
                                <AuthenticatedRoute>
                                    <LanguageManagement/>
                                </AuthenticatedRoute>
                            }/>
                            <Route path="/profile" element={
                                <AuthenticatedRoute>
                                    <Profile/>
                                </AuthenticatedRoute>
                            }/>
                            {/* GENERAL */}
                            <Route path="/error" element={<Error/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </div>
                    <Footer/>
            </AppContext.Provider>
        </div>
    );
};

export default App;
