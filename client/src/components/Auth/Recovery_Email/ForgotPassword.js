import React, { useState } from 'react';
import style from './ForgotPassword.module.css';
import { Link } from 'react-router-dom';
import { Form, Button } from 'bootstrap-4-react';
import useInput from '../../../utils/useInput';
import { RiArrowGoBackLine as BackArrow } from 'react-icons/ri';
import axios from 'axios';

const ForgotPassword = (props) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useInput('');

    const sendEmail = (e) => {
        e.preventDefault();
        email !== '' &&
            axios
                .post('/api/auth/forgotpassword', { email: email })
                .then((response) => {
                    setMessage(response.data);
                    setEmail('');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 3000);
                })
                .catch((err) => console.log(err));
    };

    return (
        <div className={style.Home}>
            <header>
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>

            <Form onSubmit={sendEmail} className={style.Form}>
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
                {message && (
                    <Form.Text>
                        <p style={{ color: '#fff', fontSize: '1rem' }}>
                            {message}
                        </p>
                    </Form.Text>
                )}
                <Button type="submit">Send recovery email</Button>
            </Form>

            <Link to="/">
                {' '}
                <BackArrow style={{ fontSize: '2rem' }} />
            </Link>
        </div>
    );
};

export default ForgotPassword;
