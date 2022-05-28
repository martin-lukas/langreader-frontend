import React from "react";
import {Link } from "react-router-dom";

const Footer = () => {
    const separator = " | ";
    return (
        <div id="footer">
            &copy; {new Date().getFullYear()} Martin Lukas
            {separator}
            <Link to="/contact">Contact Us</Link>
            {separator}
            <Link to="/tos">Terms of Service</Link>
            {separator}
            <Link to="/privacy">Privacy Policy</Link>
        </div>
    );
};

export default Footer;