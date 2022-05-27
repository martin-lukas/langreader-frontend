import {User} from "../model/User";

export const getActiveUser = (): User | undefined => {
    const userJson: string | null = localStorage.getItem("user");
    return !!userJson ? JSON.parse(userJson) : undefined;
};

export const setActiveUser = (user: User | undefined): void => {
    if (user === undefined) {
        localStorage.removeItem("user");
    } else {
        localStorage.setItem("user", JSON.stringify(user));
    }
};