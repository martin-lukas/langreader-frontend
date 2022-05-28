import React from "react";
import { Link } from "react-router-dom";
import {useAppContext} from "../context/AppContext";

const Header: React.FC = () => {
    const {activeUser, setActiveUser} = useAppContext();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        setActiveUser(undefined);
        window.location.reload();
    };

    return (
        <div id="header">
            <div className="heading">
                LangReader
            </div>
            <div className="profile-info">
                {activeUser && (
                    <>
                        <Link to="/profile">{activeUser.username}</Link>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" onClick={handleLogout} className="logout-link">(Logout)</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
