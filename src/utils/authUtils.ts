import {AxiosRequestConfig} from "axios";
import {loadActiveUser} from "./storageUtils";
import {getCsrfToken} from "./cookieUtils";

export const loadBasicAuthenticationConfig = (): AxiosRequestConfig | undefined => {
    const user = loadActiveUser();
    return user
        ? {
            auth: {username: user.username, password: user.password},
            xsrfHeaderName: getCsrfToken()
        } : undefined;
}

export const getBasicAuthenticationConfig = (username: string, password: string): AxiosRequestConfig => {
    return {auth: {username, password}};
}
