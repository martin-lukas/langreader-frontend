import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
    return (
        <div>
            <h2>Terms of Service</h2>

            <p>This document lists what you as a user of LangReader agree to when using this website.</p>

            <h3>Abuse prevention</h3>
            <p>
                In case you abuse the services this website provides, we have the right to suspend or
                delete your account. The abuse can be in the form of:
            </p>
            <ul>
                <li>uploading too many texts</li>
                <li>translating too much</li>
                <li>other abnormal activity</li>
            </ul>

            <h3>Storing personal information</h3>
            <p>
                We store your personal information, like user credentials. You can find more about this
                in the <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h3>Ownership of uploaded content</h3>
            <p>
                We do not own the content you upload in the form of texts. The content is available only to
                the account that created it. We do reserve the right to remove said content in case the
                account is linked to abuse mentioned above.
            </p>

            <h3>Liability for uploaded content</h3>
            <p>
                We are not liable for the content the users upload. Content that is copyrighted
                will be deleted on request from the copyright holder.
            </p>

            <h3>Termination of account</h3>
            <p>
                If you wish to delete your account on this website, you can do so in the <b>Profile</b> section,
                which is accessible after login.
            </p>
        </div>
    );
};

export default TermsOfService;
