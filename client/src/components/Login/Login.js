import React, { useState } from 'react';
import style from './Login.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import { login } from '../../utils/auth';

const Login = ({ setUser, setIsSignup }) => {
    const [message, setMessage] = useState('');

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };
    // console.log('loginForm', loginForm);

    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            email: loginForm.email,
            password: loginForm.password,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                //Reset input values
                for (let key in loginForm) {
                    setLoginForm({ ...loginForm, [key]: '' });
                }
            } else {
                //  put the user object in the state of App.js
                console.log(user);
                setUser(user);
            }
            console.log('loginForm', loginForm);
        });
    };
    return (
        <Form className={style.Form} onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="email">Email</label>
                <Form.Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="password">Password</label>
                <Form.Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Text className={style.forgPass}>
                <Link to="#">Forgot password?</Link>
            </Form.Text>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <p>
                Don't have an account?{' '}
                <button
                    onClick={() => {
                        setIsSignup(true);
                    }}
                >
                    Create one now
                </button>
            </p>
            <Button primary type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;
