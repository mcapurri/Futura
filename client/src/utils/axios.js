import axios from 'axios';
const token = localStorage.getItem('token');

const instance = axios.create({
    baseUrl: `${process.env.ORIGIN}`,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization'];
}

export default instance;
