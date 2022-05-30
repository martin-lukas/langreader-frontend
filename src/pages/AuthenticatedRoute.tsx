import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

interface AuthenticatedRouteProps {
    children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({children}) => {
    const {activeUser} = useAppContext();
    return (
        <>
            {activeUser
                ? children
                : <Navigate to="/login"/>
            }
        </>
    );
};

export default AuthenticatedRoute;
