import {Link} from "react-router-dom";
import React from "react";

interface BackButtonProps extends React.HTMLAttributes<HTMLElement> {
    to: string;
}

const BackButton: React.FC<BackButtonProps> = ({to}) => {
    return (
        <Link to={to} className="back-button">
            <i className="far fa-arrow-alt-circle-left"/>
        </Link>
    );
};

export default BackButton;