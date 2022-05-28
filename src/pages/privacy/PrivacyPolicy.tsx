import React from "react";

const PrivacyPolicy: React.FC = () => {
    return (
        <div>
            <h2>Privacy Policy</h2>
            <p>This document describes the privacy policy of this website.</p>

            <h3>What we collect</h3>
            <p>
                We only store user credentials that you provide on registration. No other personal data
                is collected. To keep you logged in, we store a login token in the local storage of your
                browser. No cookies are used.
            </p>

            <h3>How are your data stored</h3>
            <p>
                As mentioned above, we only collect your username and password (regarding personal data).
                The password is stored securely (hashed and salted). During login, the password is sent through
                an encrypted channel (thanks to HTTPS).
            </p>

            <h3>Data protection rights</h3>
            <p>
                You have the right to request the removal of your data from our database. You can do so
                from the <b>Profile</b> section upon logging in. If you can't login, let us know through
                the <b>Contact Us</b> form linked at the bottom of the page.
            </p>

            <h3>Changes to this Privacy Policy</h3>
            <p>This Privacy Policy may be changed in the future. We will let you know if that happens.</p>
        </div>
    );
};

export default PrivacyPolicy;
