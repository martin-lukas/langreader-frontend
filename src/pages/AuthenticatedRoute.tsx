import React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

export const AuthenticatedRoute: React.FC<RouteProps> = ({children, ...routeProps}) => {
    const {activeUser} = useAppContext();
    return (
        <Route {...routeProps}>
            {activeUser
                ? children
                : <Redirect to="/login"/>
            }
        </Route>
    );
};

export default AuthenticatedRoute;
