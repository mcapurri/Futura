import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:3000/api',
    // withCredentials: true // => I might need this when having the users in the app
});

const errorHandler = (err) => {
    // console.error(err);
    throw err;
};
const handleUpload = async (file) => {
    try {
        const resp = await service.post('/users/upload', file);
        return resp.data;
    } catch (err) {
        errorHandler(err);
    }
};

const saveNewThing = async (newThing) => {
    console.log('new thing is: ', newThing);
    try {
        const resp = await service.put(`/users/${newThing._id}`, newThing);
        return resp.data;
    } catch (err) {
        errorHandler(err);
    }
};

export default {
    service,
    handleUpload,
    saveNewThing,
};
