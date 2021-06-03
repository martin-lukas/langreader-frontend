import React from "react";
import { Link } from "react-router-dom";
import { User } from "../model/User";

interface HeaderProps {
    activeUser: User | null;
}

const Header: React.FC<HeaderProps> = ({activeUser}) => {
    return (
        <div id="header">
            LangReader
            <div className="profile-info">
                {activeUser &&
                <>
                    <Link to="/profile">{activeUser.username}</Link>
                    <span> (Logout)</span>
                </>
                }
            </div>
        </div>
    );
};

export default Header;
