import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = (props) => {
    const [message, setMessage] = useState('');
    const [resetForm, setResetForm] = useState({
        password: '',
        confirm: '',
        token: props.match.params.resettoken,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResetForm({
            ...resetForm,
            [name]: value,
        });
    };
    // console.log('resetform', resetForm);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`/api/auth/resetpassword/${resetForm.token}`)
            .then((res) => console.log('response', res))
            .catch((err) => console.log(err));
    };

    return (
        <div className={style.Home}>
            <header>
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>
            <Form className={style.Form} onSubmit={handleSubmit}>
                <Form.Group>
                    <label htmlFor="password">Password</label>
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={resetForm.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="confirm">Confirm Password</label>
                    <Form.Input
                        name="confirm"
                        type="password"
                        placeholder="Confirm Password"
                        value={resetForm.confirm}
                        onChange={handleChange}
                    />
                </Form.Group>
                <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                <Button type="submit">Reset Password</Button>
            </Form>

            <Link to="/">Back</Link>
        </div>
    );
};

export default ResetPassword;
