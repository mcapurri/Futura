import axios from 'axios';
const token = localStorage.getItem('token');

const instance = axios.create({
    // baseURL: 'http://localhost:5005/api',
    baseUrl: process.env.ORIGIN,
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true // => you might need this when having the users in the app
});

if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = token;
} else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization'];
}

// instance.interceptors.request.use(
//     (req) => {
//         if (axios.defaults.headers.common['Authorization']) return req;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axios.interceptors.request.use(
//     (config) => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = ['http://localhost:3000'];
//         const token = localStorage.getItem('token');
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// //on successful response
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const fallbackValue = [
//             {
//                 error,
//                 // reason: 'Not authorized to access this route',
//                 // title: 'Please try again',
//                 completed: false,
//             },
//         ];
//         return Promise.reject(fallbackValue);
//     }
// );

export default instance;
