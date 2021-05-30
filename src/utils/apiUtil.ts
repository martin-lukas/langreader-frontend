import axios from '../services/axiosInstance';

const get = (url: string, params: string) => {
    return axios({method: 'get', url, params});
};

const post = (url: string, params: string, data: string) => {
    return axios({method: 'post', url, params, data});
};

const put = (url: string, params: string, data: string) => {
    return axios({method: 'put', url, params, data});
};

const del = (url: string, params: string) => {
    return axios({method: 'delete', url, params});
};

export default {get, post, put, del};