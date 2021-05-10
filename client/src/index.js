import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import jwt from 'jsonwebtoken';
import { jwtSecret } from './utils/config.json';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const token = localStorage.getItem('token');
jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (!err) {
        const loggedInUser = await axios.get(
            `/api/auth/loggedin/${decoded._id}`
        );
        ReactDOM.render(
            <BrowserRouter>
                <App user={{ ...loggedInUser.data, ...decoded }} />
            </BrowserRouter>,
            document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <BrowserRouter>
                <App user={''} />
            </BrowserRouter>,
            document.getElementById('root')
        );
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
