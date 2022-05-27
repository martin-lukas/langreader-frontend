import React, {useContext, useState} from "react";
import "../../css/auth.scss";
import {signupUser} from "../../services/AuthService";
import {Language} from "../../model/Language";
import {AppContext, useAppContext} from "../../context/AppContext";

const Signup: React.FC = () => {
    const context = useAppContext();
    const allLanguages = context.allLanguages as Language[];

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [nativeLanguage, setNativeLanguage] = useState<Language>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [isSuccessful, setSuccessful] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    console.log(nativeLanguage)

    const handleNativeLanguageChange = (event: any) => {
        setNativeLanguage(allLanguages[event.target.value]);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        if (username && password) {
            try {
                await signupUser(username, password);
                if (false) {
                    // dispatch('lang/fetchUserLangs');
                    // dispatch('lang/fetchChosenLang');
                    // dispatch('lang/fetchNativeLang');
                }
                // this.$router.push('/');
            } catch (error) {
                setLoading(false);
                setErrorMessage("Incorrect username or password. Please try again.");
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div id="signup-view" className="auth-view">
            <h3>Sign Up Page</h3>
            {infoMessage && (
                <div className="info-div">{infoMessage}</div>
            )}
            {errorMessage && (
                <div className="error-div">{errorMessage}</div>
            )}
            <div className="auth-form">
                <form name="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username-input">Username</label>
                        <input
                            id="username-input"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="password-input">Password</label>
                        <input
                            id="password-input"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="confirm-password-input">Confirm password</label>
                        <input
                            id="confirm-password-input"
                            name="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label id="lang-label" htmlFor="native-lang-select">
                            Select Your Native Language:
                        </label>
                        <select onChange={handleNativeLanguageChange} id="native-lang-select">
                            <option value={undefined} selected>Choose Language</option>
                            {allLanguages.map((language, index) => (
                                <option value={index} key={language.id}>
                                    {language.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="auth-submit-button-div lower-form-group">
                        <button className="auth-submit-button" disabled={loading}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;