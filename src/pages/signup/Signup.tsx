import React, {useState} from "react";
import "../../css/auth.scss";
import {signupUser} from "../../services/AuthService";
import {Language} from "../../model/Language";
import {useAppContext} from "../../context/AppContext";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";

interface SignupFields {
    username: string;
    password: string;
    confirmPassword: string;
    nativeLang?: Language;
}

const FIELDS_DEFAULT: SignupFields = {
    username: "",
    password: "",
    confirmPassword: "",
};

const Signup: React.FC = () => {
    const {isLoading, startLoading, stopLoading} = useLoader(false);
    const context = useAppContext();
    const allLanguages = context.allLanguages as Language[];

    const [fields, setFields] = useState<SignupFields>(FIELDS_DEFAULT);

    const [infoMessage, setInfoMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (name: string, value: string | Language): void => {
        setFields({
            ...fields,
            [name]: value
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        handleChange(event.target.name, event.target.value);
    };

    const handleNativeLangChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        handleChange(event.target.name, allLanguages[Number(event.target.value)]);
    };

    const trimFields = (fields: SignupFields): SignupFields => {
        return {
            ...fields,
            username: fields.username.trim(),
            password: fields.password.trim(),
            confirmPassword: fields.confirmPassword.trim(),
        };
    };

    const validate = (formData: SignupFields) => {
        let errorMsg = "";
        if (!formData.username || !formData.password || !formData.confirmPassword || !formData.nativeLang) {
            errorMsg = "Make sure you fill out all the fields.";
        } else if (formData.password !== formData.confirmPassword) {
            errorMsg = "Make sure the passwords match.";
        }
        setErrorMessage(errorMsg);
        return !errorMsg;
    };

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault();

        setInfoMessage("");

        const trimmedFields = trimFields(fields);

        if (validate(trimmedFields)) {
            startLoading();
            signupUser(trimmedFields.username, trimmedFields.password, trimmedFields.nativeLang!)
                .then(() => {
                    setInfoMessage("Registration successful! You can log in now.");
                    setFields(FIELDS_DEFAULT);
                })
                .catch(() => {
                    setErrorMessage("The registration wasn't successfull. Please try again later.");
                })
                .finally(stopLoading);
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
                            value={fields.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="password-input">Password</label>
                        <input
                            id="password-input"
                            name="password"
                            type="password"
                            value={fields.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="confirm-password-input">Confirm password</label>
                        <input
                            id="confirm-password-input"
                            name="confirmPassword"
                            type="password"
                            value={fields.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label id="lang-label" htmlFor="native-lang-select">
                            Select Your Native Language:
                        </label>
                        <select onChange={handleNativeLangChange} id="native-lang-select" name="nativeLang">
                            <option value={undefined} defaultValue={undefined}>Choose Language</option>
                            {allLanguages.map((language, index) => (
                                <option value={index} key={language.id}>
                                    {language.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="auth-submit-button-div lower-form-group">
                        <button className="auth-submit-button">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
