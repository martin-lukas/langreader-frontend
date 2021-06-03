import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import { Text } from "../model/Text";
import { ParsedText } from "../model/ParsedText";

const BASE_URL = '/texts';

export const fetchTitles = (): Promise<AxiosResponse<Array<Text>>> => {
    return axios.get<Array<Text>>(BASE_URL);
};

export const fetchText = (id: string): Promise<AxiosResponse<Text>> => {
    return axios.get<Text>(`${BASE_URL}/${id}`);
};

export const fetchParsedText = (id: string): Promise<AxiosResponse<ParsedText>> => {
    return axios.get<ParsedText>(`${BASE_URL}/${id}/parsed`);
};

export const addTextToDB = (text: Text, callback?: () => void): void => {
    axios.post(BASE_URL, text)
        .then(response => {
            callback && callback();
        })
        .catch(err => console.error(err.response.data));
};

export const updateTextInDB = (text: Text, callback?: () => void): void => {
    axios.put(BASE_URL, text)
        .then(response => {
            callback && callback();
        })
        .catch(err => console.error(err.response.data));
};

export const deleteTextFromDB = (text: Text): void => {
    axios.delete(BASE_URL, { params: { id: text.id } })
        .catch(err => console.error(err.response.data));
};