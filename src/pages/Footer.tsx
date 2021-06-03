import React from "react";

const Footer = () => {
    const separator = " | ";
    return (
        <div id="footer">
            &copy; {new Date().getFullYear()} Martin Lukáš
            {separator}
            <a href="/contact">Contact Us</a>
            {separator}
            <a href="/tos">Terms of Service</a>
            {separator}
            <a href="/privacy">Privacy Policy</a>
        </div>
    );
};

export default Footer;