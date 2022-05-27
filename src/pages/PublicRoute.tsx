import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

export const AuthenticatedRoute: React.FC<RouteProps> = ({children, ...routeProps}) => {
    const {activeUser} = useAppContext();

    return (
        <Route {...routeProps}>
            {activeUser
                ? <Redirect to="/library"/>
                : children
            }
        </Route>
    );
};

export default AuthenticatedRoute;
