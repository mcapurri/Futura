import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:3000/api',
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
    // console.error(err);
    throw err;
};

export default {
    service,

    handleUpload(theFile) {
        // console.log('file in service: ', theFile)
        return service
            .post('/users/upload', theFile)
            .then((res) => res.data)
            .catch(errorHandler);
    },

    saveNewThing(newThing) {
        console.log('new thing is: ', newThing);
        return service
            .put(`/users/${newThing._id}`, newThing)
            .then((res) => res.data)
            .catch(errorHandler);
    },
};
