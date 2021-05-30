import useApi from "./ApiHook";

const useTranslation = (word: string) => {
    const api = useApi('get', '/translate', {word: word});
    
    const translate = (callback: () => void) => api.fetch(callback);
    
    return [api.data, translate];
};

export default useTranslation;