import {useState} from "react";

export function useLoader(defaultState = true) {
    const [isLoading, setIsLoading] = useState<boolean>(defaultState);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    return {isLoading, startLoading, stopLoading};
}
