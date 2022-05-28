import axios from "../utils/axiosInstance";
import { AxiosResponse } from "axios";
import {ContactMessage} from "../model/ContactMessage";

const BASE_URL = "/contact";

export const sendEmail = (message: ContactMessage): Promise<AxiosResponse<void>> => {
    return axios.post(BASE_URL, message);
};
