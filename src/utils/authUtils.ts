import { AxiosRequestConfig } from "axios";
import {getActiveUser} from "./storageUtils";

export const getBasicAuthConfig = (): AxiosRequestConfig | undefined => {
    const user = getActiveUser();
    return user ? {auth: {username: user.username, password: user.password}} : undefined;
}
