import React, {useState} from "react";
import "../../css/auth.scss";

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = (event: any): void => {
        event.preventDefault();
        // TODO: submit
    };

    const loading = false;

    return (
        <div id="signup-view" className="auth-view">
            <h3>Sign Up Page</h3>
            <div className="error-div" v-if="errMessage">{"errMessage"}</div>
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
                    <div className="auth-submit-button-div lower-form-group">
                        <button className="auth-submit-button" disabled={loading}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;