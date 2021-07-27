import axios from "axios";

export const sendGetRequest = async (url, params) => {
    try {
        const axiosRequestConfig = {
            params
        };

        const response = await axios.get(url, axiosRequestConfig);
        return [response, null];
    }
    catch (error) {
        return [null, error];
    }
}

export const sendPostRequest = async (url, data, params) => {
    try {
        const axiosRequestConfig = {
            params
        };

        const response = await axios.post(url, data, axiosRequestConfig);
        return [response, null];
    }
    catch (error) {
        return [null, error];
    }
}