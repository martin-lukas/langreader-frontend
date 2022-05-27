import {AxiosRequestConfig} from "axios";
import {loadActiveUser} from "./storageUtils";
import {getCsrfToken} from "./cookieUtils";

export const getBasicAuthenticationConfig = (): AxiosRequestConfig | undefined => {
    const user = loadActiveUser();
    return user
        ? {
            auth: {username: user.username, password: user.password},
            xsrfHeaderName: getCsrfToken()
        } : undefined;
}
