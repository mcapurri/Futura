import axios from 'axios';
const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: process.env.ORIGIN,
    headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    // url: props.url, // must have a starting backslash:
    // params: props.params,
    // data: props.data,
    withCredentials: true,
});

if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = token;
} else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization'];
}

instance.interceptors.request.use(
    (req) => {
        if (axios.defaults.headers.common['Authorization']) return req;
        throw { message: 'the token is not available' };
    },
    (error) => {
        return Promise.reject(error);
    }
);

//on successful response
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const fallbackValue = [
            {
                userId: 'Not authorized',
                id: 'aerw15311sq',
                title: 'Please try again',
                completed: false,
            },
        ];
        return Promise.reject(fallbackValue);
    }
);

export default instance;
