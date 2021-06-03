import React, { useEffect, useState } from "react";
import "../css/custom.scss";
import { fetchActiveUser } from "../services/UserService";
import { User } from "../model/User";
import PrivateApp from "./PrivateApp";
import PublicApp from "./PublicApp";

const App = () => {
    const [activeUser, setActiveUser] = useState<User | null | undefined>();

    useEffect(() => {
        fetchActiveUser()
            .then((response) => {
                setActiveUser(response.data);
            })
            .catch(err => {
                setActiveUser(null);
            });
    }, []);

    return (
        <>
            {activeUser !== undefined &&
            <>
                {activeUser !== null
                    ? <PrivateApp activeUser={activeUser} />
                    : <PublicApp activeUser={activeUser} />
                }
            </>
            }
        </>
    );
};

export default App;
