import React from "react";
import { Link } from "react-router-dom";
import {useAppContext} from "../context/AppContext";

const Header: React.FC = () => {
    const {activeUser, setActiveUser} = useAppContext();

    const handleLogout = () => {
        setActiveUser(undefined);
        window.location.reload();
    };

    return (
        <div id="header">
            LangReader
            <div className="profile-info">
                {activeUser &&
                <>
                    <Link to="/profile">{activeUser.username}</Link>
                    <button onClick={handleLogout}>(Logout)</button>
                </>
                }
            </div>
        </div>
    );
};

export default Header;
