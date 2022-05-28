import React, {FormEvent, useState} from "react";
import {ContactMessage} from "../../model/ContactMessage";
import {sendEmail} from "../../services/ContactService";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";

const ContactUs: React.FC = () => {
    const {isLoading, startLoading, stopLoading} = useLoader(false);

    // TODO: Validate email address
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [text, setText] = useState<string>("");

    const [infoMessage, setInfoMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSuccessful, setIsSuccessful] = useState<boolean>();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const getTrimmedMessageObject = (): ContactMessage => {
        return {
            email: email.trim(),
            subject: subject.trim(),
            text: text.trim(),
        };
    };

    const handleSendMail = (event: FormEvent) => {
        event.preventDefault();

        setInfoMessage("");

        const trimmedMessage = getTrimmedMessageObject();

        if (trimmedMessage.email) {
            if (trimmedMessage.subject) {
                if (trimmedMessage.text) {
                    startLoading();
                    sendEmail(trimmedMessage)
                        .then(() => {
                            setErrorMessage("");
                            setInfoMessage("Message sent. We'll get back to you.");
                            setIsSuccessful(true);
                        })
                        .catch(() => {
                            setErrorMessage("We encountered a problem while sending your message. Please try again later.");
                            setIsSuccessful(false);
                            setIsSubmitted(true);
                        }).finally(stopLoading);
                } else {
                    setErrorMessage("The text of the message can't be empty.");
                    setIsSuccessful(false);
                }
            } else {
                setErrorMessage("The subject is empty. Please describe the purpose of your message.");
                setIsSuccessful(false);
            }
        } else {
            setErrorMessage("The email is empty. Providing email is necessary for replying to your message.");
            setIsSuccessful(false);
        }
    };

    if (isLoading) return <Loader/>;

    return (
        <div>
            <h2>Contact Us</h2>

            <div className="contact-message-div">
                {infoMessage && (
                    <div className="info-div">{infoMessage}</div>
                )}
                {errorMessage && (
                    <div className="error-div">{errorMessage}</div>
                )}
            </div>

            {!isSuccessful && !isSubmitted && (
                <form id="contact-form" name="form" onSubmit={handleSendMail}>
                    <div>
                        <label htmlFor="email-input">Email*</label>
                        <input
                            id="email-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="subject-input">Subject</label>
                        <input
                            id="subject-input"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="lower-form-group">
                        <label htmlFor="input-text">Text</label>
                        <textarea
                            id="input-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={10}
                        />
                    </div>
                    <div className="contact-submit-button-div lower-form-group">
                        <button className="auth-submit-button">Submit</button>
                    </div>
                    <div className="contact-additional-info">
                        <p>* Your e-mail address will only be used for replying to your message.</p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactUs;
