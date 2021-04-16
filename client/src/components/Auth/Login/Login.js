import React, { useState } from 'react';
import style from './Login.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import { login } from '../../../utils/auth';
import useInput from '../../../utils/useInput';

const Login = ({ setUser, setIsSignup, setForgotPassword }) => {
    const [message, setMessage] = useState('');

    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            email: email,
            password: password,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                //Reset input values
                setEmail('');
                setPassword('');
            } else {
                //  put the user object in the state of App.js
                if (user.token) {
                    // console.log('cookie', document.cookie);
                    localStorage.setItem('token', user.token);
                }
                setUser(user.user);
                // console.log(user);
            }
        });
        // const user = await login({ email: email, password: password });
        // user.message
        //     ? (setMessage(user.message), setEmail(''), setPassword(''))
        //     : setUser(user);
    };
    return (
        <Form className={style.Form} onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="email">Email</label>
                <Form.Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={setEmail}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="password">Password</label>
                <Form.Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                />
            </Form.Group>
            <Form.Text className={style.forgPass}>
                <Link to="/forgotpassword">Forgot password?</Link>
            </Form.Text>
            <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
            <p>
                Don't have an account? &nbsp;
                <Link to="/signup">Create one now</Link>
            </p>
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default Login;
