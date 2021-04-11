import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import useInput from '../../../utils/useInput';
import axios from 'axios';
import { RiArrowGoBackLine as BackArrow } from 'react-icons/ri';

const ResetPassword = (props) => {
    const [message, setMessage] = useState('');

    const [password, setPassword] = useInput('');
    const [confirm, setConfirm] = useInput('');
    const [token] = useState(props.match.params.resettoken);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`/api/auth/resetpassword/${token}`, { password, confirm })
            .then((res) => {
                console.log('response', res);
                setMessage(res);
            })
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
                        value={password}
                        onChange={setPassword}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="confirm">Confirm Password</label>
                    <Form.Input
                        name="confirm"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={setConfirm}
                    />
                </Form.Group>
                <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                <Button type="submit">Reset Password</Button>
            </Form>

            <Link to="/">
                {' '}
                <BackArrow style={{ fontSize: '2rem' }} />
            </Link>
        </div>
    );
};

export default ResetPassword;
