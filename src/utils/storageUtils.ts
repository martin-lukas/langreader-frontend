import {User} from "../model/User";
import {Language} from "../model/Language";

export const loadActiveUser = (): User | undefined => {
    const userJson: string | null = localStorage.getItem("user");
    return !!userJson ? JSON.parse(userJson) : undefined;
};

export const storeActiveUser = (user: User | undefined): void => {
    if (user === undefined) {
        localStorage.removeItem("user");
    } else {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

export const loadChosenLang = (): Language | undefined => {
    const savedUser = loadActiveUser();
    return savedUser?.chosenLang;
};

export const storeChosenLang = (chosenLang: Language): void => {
    const savedUser = loadActiveUser();
    if (savedUser) {
        savedUser.chosenLang = chosenLang;
        storeActiveUser(savedUser);
    }
};

export const loadNativeLang = (): Language | undefined => {
    const savedUser = loadActiveUser();
    return savedUser?.nativeLang;
};