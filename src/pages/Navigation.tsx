import React from "react";
import {Link} from "react-router-dom";
import { User } from "../model/User";

interface HeaderProps {
    activeUser: User | null;
}

const Navigation: React.FC<HeaderProps> = ({activeUser}) => {
    const toggleTopNav = (event: any) => {
        event.stopPropagation();
        const navBarElement = document.getElementById("top-nav");
        if (navBarElement) {
            navBarElement.className = navBarElement.className ? "" : "responsive";
        }
    };
    
    const collapseTopNav = () => {
        const navBarElement = document.getElementById("top-nav");
        if (navBarElement) {
            navBarElement.className = "";
        }
    };
    if (!activeUser) {
        return (
            <nav id="top-nav" onClick={collapseTopNav}>
                <Link to="/" className="always-visible nav-link">Home</Link>
                <div className="right-aligned">
                    <Link to="/login" className="nav-link lang-link">Log In</Link>
                    <Link to="/signup" className="nav-link lang-link">Sign Up</Link>
                </div>
                <button className="icon" onClick={toggleTopNav}>
                    <i className="fa fa-bars"/>
                </button>
            </nav>
        );
    }
    else {
        return (
            <nav id="top-nav" onClick={collapseTopNav}>
                <Link to="/library" className="always-visible nav-link">Library</Link>
                <div className="right-aligned">
                    <Link to="/languages" className="nav-link lang-link">Manage languages</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </div>
                <button className="icon" onClick={toggleTopNav}>
                    <i className="fa fa-bars"/>
                </button>
            </nav>
        );
    }
};

export default Navigation;
