import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ATLAS_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('byoutakToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.log('[AXIOS]', 'REQUEST', JSON.stringify({ error }));
            return config;
        }
    },
    (error) => Promise.reject(error.response),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
