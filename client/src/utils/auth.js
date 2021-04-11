import axios from 'axios';

const signup = async (userCredentials) => {
    try {
        const response = await axios.post('/api/auth/signup', userCredentials);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

const login = async (userCredentials) => {
    try {
        const response = await axios.post('/api/auth/login', userCredentials);
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

const logout = async () => {
    try {
        const response = await axios.delete('/api/auth/logout');

        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

export { signup, login, logout };
