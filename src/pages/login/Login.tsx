import React, {useState} from "react";
import "../../css/auth.scss";
import {loginUser} from "../../services/AuthService";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";
import {useAppContext} from "../../context/AppContext";
import { Redirect } from "react-router-dom";

const Login: React.FC = () => {
    const {activeUser, setActiveUser} = useAppContext();
    const {isLoading, startLoading, stopLoading} = useLoader(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (event: any): void => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage("Make sure you fill out all the fields.");
            return;
        }
        startLoading();
        loginUser(username, password)
            .then((response) => {
                setErrorMessage("");
                const fetchedUser = response.data;
                setActiveUser({...fetchedUser, password});
                window.location.reload();
            }).catch(() => {
                setErrorMessage("The login attempt was unsuccessful");
                stopLoading();
            });
    };

    if (isLoading) return <Loader/>;

    if (activeUser) {
        return <Redirect to="/library"/>;
    }

    return (
        <div id="login-view" className="auth-view">
            <h3>Login Page</h3>
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
                    <div className="auth-submit-button-div lower-form-group">
                        <button className="auth-submit-button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;