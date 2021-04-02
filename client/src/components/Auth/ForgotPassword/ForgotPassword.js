import React, { useState } from 'react';
import style from './ForgotPassword.module.css';
import Login from '../../Auth/Login/Login';
import { AiOutlineLogout as LogoutIcon } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Form, Button } from 'bootstrap-4-react';
import axios from 'axios';

const ForgotPassword = (user, handleLogout, ...props) => {
    console.log('props', props);
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
                    .post('/api/auth/forgotpassword', { email: email })
                    .then((response) => {
                        setMessage(response.data);
                        setEmail('');
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    })
                    .catch((err) => console.log(err));
        }
    };

    return (
        <div className={style.Home}>
            <header>
                {user && (
                    <>
                        <div className={style.Avatar}>
                            {user.avatar ? (
                                <img src={user.avatar} alt="user-avatar" />
                            ) : (
                                <h1
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '4rem',
                                    }}
                                >
                                    +
                                </h1>
                            )}
                        </div>
                        <LogoutIcon
                            style={{
                                fontSize: '2rem',
                                display: 'flex',
                                justifySelf: 'flex-start',
                                position: 'fixed',
                                right: '7%',
                                top: '3%',
                            }}
                            onClick={handleLogout}
                        />
                    </>
                )}
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
                        onChange={handleChange}
                    />
                </Form.Group>
                {message && (
                    <Form.Text>
                        <p style={{ color: 'red' }}>{message}</p>
                    </Form.Text>
                )}
                <Button type="submit">Send recovery email</Button>
            </Form>
            <Link to="/">Back</Link>
        </div>
    );
};

export default ForgotPassword;
