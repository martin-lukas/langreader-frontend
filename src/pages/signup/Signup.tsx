import React, {useState} from "react";
import "../../css/auth.scss";
import {signupUser} from "../../services/AuthService";
import {Language} from "../../model/Language";
import {useAppContext} from "../../context/AppContext";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";

const Signup: React.FC = () => {
    const {isLoading, startLoading, stopLoading} = useLoader(false);
    const context = useAppContext();
    const allLanguages = context.allLanguages as Language[];

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [nativeLanguage, setNativeLanguage] = useState<Language>();

    const [infoMessage, setInfoMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleNativeLanguageChange = (event: any) => {
        setNativeLanguage(allLanguages[event.target.value]);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setInfoMessage("");
        setErrorMessage("");
        if (username && password && confirmPassword && nativeLanguage) {
            if (password === confirmPassword) {
                startLoading();
                signupUser(username, password, nativeLanguage)
                    .then(() => {
                        setInfoMessage("Registration successful! You can log in now.");
                        setUsername("");
                        setPassword("");
                        setConfirmPassword("");
                        setNativeLanguage(undefined);
                    })
                    .catch(() => {
                        setErrorMessage("The registration wasn't successfull. Please try again later.");
                    })
                    .finally(stopLoading);
            } else {
                setErrorMessage("Make sure the passwords match.");
            }
        } else {
            setErrorMessage("Make sure you fill out all the fields.");
        }
    };

    if (isLoading) return <Loader/>;

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
                            <option value={undefined} defaultValue={undefined}>Choose Language</option>
                            {allLanguages.map((language, index) => (
                                <option value={index} key={language.id}>
                                    {language.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="auth-submit-button-div lower-form-group">
                        <button className="auth-submit-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
