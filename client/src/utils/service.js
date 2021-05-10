import axios from 'axios';

const token = localStorage.getItem('token');
const service = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
    // console.error(err);
    throw err;
};

const handleUpload = async (file, id) => {
    try {
        const resp = await service.post(`/users/upload/${id}`, file);
        return resp.data;
    } catch (err) {
        errorHandler(err);
    }
};

export { service, handleUpload };
