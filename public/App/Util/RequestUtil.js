import axios from "axios";

export const sendGetRequest = async (url, params) => {
    try {
        const axiosRequestConfig = {
            params
        };

        const response = await axios.get(url, axiosRequestConfig);
        return [response, null]
    }
    catch (error) {
        return [null, error]
    }

}