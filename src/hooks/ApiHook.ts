import {useState} from 'react';
import api from '../utils/apiUtil';

const useApi = (method: string, url: string, params: any, body?: any) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    const fetch = (callback: (data: any) => void) => {
        // @ts-ignore
        const apiMethod = api[method];
        apiMethod(url, params, body)
            .then((response: any) => {
                setData(response.data);
                callback && callback(response.data);
            })
            .catch((err: any) => {
                setError(err);
            });
    }
    
    return {data, error, fetch};
};

export default useApi;