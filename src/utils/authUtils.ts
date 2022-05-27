import {AxiosRequestConfig} from "axios";
import {getActiveUser} from "./storageUtils";
import {getCsrfToken} from "./cookieUtils";

export const getBasicAuthenticationConfig = (): AxiosRequestConfig | undefined => {
    const user = getActiveUser();
    return user
        ? {
            auth: {username: user.username, password: user.password},
            xsrfHeaderName: getCsrfToken()
        } : undefined;
}
