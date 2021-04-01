import React, { useState, useCallback } from 'react';
import style from './ForgotPassword.module.css';
import { Form, Button } from 'bootstrap-4-react';
import axios from 'axios';

const ForgotPassword = () => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        {
            email !== '' &&
                axios
                    .post('/api/auth/forgotPassword', { email: email })
                    .then((response) => {
                        setMessage(response.data);
                        setEmail('');
                        forceUpdate();
                    })
                    .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <Form onSubmit={sendEmail} className={style.Form}>
                <Form.Group>
                    <label htmlFor="email">Email</label>
                    <Form.Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Group>
                {message && (
                    <Form.Text>
                        <p style={{ color: 'red' }}>{message}</p>
                    </Form.Text>
                )}
                <Button type="submit">Reset password</Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;
