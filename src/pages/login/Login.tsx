import React, {useState} from "react";
import "../../css/auth.scss";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loading = false;

    const handleSubmit = (event: any): void => {
        event.preventDefault();
    };

    return (
        <div id="login-view" className="auth-view">
            <h3>Login Page</h3>
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
                    <div className="auth-submit-button-div lower-form-group">
                        <button disabled={loading} className="auth-submit-button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;