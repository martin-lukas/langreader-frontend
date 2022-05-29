import React, {useEffect, useState} from "react";
import {useAppContext} from "../../context/AppContext";
import {useLoader} from "../common/LoaderHook";
import Loader from "../common/Loader";
import {fetchLanguageStatistics} from "../../services/StatisticsService";
import {LanguageStatistics} from "../../model/LanguageStatistics";
import "../../css/profile.scss";
import {deleteOwnAccount} from "../../services/UserService";
import { Link } from "react-router-dom";

const Profile = () => {
    const {isLoading, startLoading, stopLoading} = useLoader();
    const {activeUser, setActiveUser} = useAppContext();

    const [languageStatistics, setLanguageStatistics] = useState<LanguageStatistics[]>([]);
    const [isDeleteShown, setIsDeleteShown] = useState(false);
    const [isDeleteConsented, setIsDeleteConsented] = useState(false);
    const [isDeleteErrorShown, setIsDeleteErrorShown] = useState(false);

    const toggleShowDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setIsDeleteShown(prevState => !prevState);
    };

    const handleUserDeletion = () => {
        startLoading();
        setIsDeleteErrorShown(false);
        deleteOwnAccount()
            .then(() => {
                setActiveUser(undefined);
                window.location.reload();
            })
            .catch(() => {
                setIsDeleteErrorShown(true);
                stopLoading();
            });
    };

    useEffect(() => {
        fetchLanguageStatistics()
            .then(response => setLanguageStatistics(response.data))
            .catch(err => console.error(err))
            .finally(stopLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loader/>;

    return (
        <div className="profile-page">
            <h1>Hi, {activeUser?.username}!</h1>
            <hr/>
            <h4>Native Language: {activeUser?.nativeLang.fullName}</h4>
            <h2>Language Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th># of known</th>
                        <th># of studied</th>
                        <th># of ignored</th>
                    </tr>
                </thead>
                <tbody>
                    {languageStatistics.map((langStat) => (
                        <tr key={langStat.language.id}>
                            <td>{langStat.language.fullName}</td>
                            <td>{langStat.knownCount}</td>
                            <td>{langStat.studiedCount}</td>
                            <td>{langStat.ignoredCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="delete-div">
                {isDeleteErrorShown && (
                    <div className="error-div">
                        The account deletion was unsuccessful.
                        <br/>
                        Please contact us through the <Link to="/contact">contact form</Link>.
                    </div>
                )}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" onClick={toggleShowDelete} className="account-removal-link">Click here to proceed to account removal.</a>
                {isDeleteShown && (
                    <>
                        <div id="del-consent">
                            <input
                                id="delete-account-box"
                                type="checkbox"
                                checked={isDeleteConsented}
                                onChange={(e) => setIsDeleteConsented(e.target.checked)}
                            />
                            <label htmlFor="delete-account-box">
                                I request a complete removal of this account, including
                                all the personal data and uploaded content associated with it.
                            </label>
                        </div>
                        {isDeleteConsented && (
                            <button onClick={handleUserDeletion}>Delete Account</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;