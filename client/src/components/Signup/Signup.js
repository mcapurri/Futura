import React, { useState } from 'react';
import style from './Signup.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { signup } from '../../utils/auth';
import { Link } from 'react-router-dom';

const Signup = ({ setIsLogin, setIsSignup, setUser }) => {
    const [message, setMessage] = useState('');

    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirm: '',
        address: {
            street: '',
            city: '',
            zipCode: '',
            state: '',
        },
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupForm({
            ...signupForm,
            [name]: value,
        });
    };
    // console.log('signupForm', signupForm);

    const handleSubmit = (event) => {
        event.preventDefault();

        signup({
            firstName: signupForm.firstName,
            lastName: signupForm.lastName,
            email: signupForm.email,
            password: signupForm.password,
            confirm: signupForm.confirm,
            street: signupForm.address.street,
            zipCode: signupForm.address.zipCode,
            city: signupForm.address.city,
            state: signupForm.address.state,
            phoneNumber: signupForm.phoneNumber,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                // Reset input values
                for (let key in signupForm) {
                    setSignupForm({
                        ...signupForm,
                        [key]: '',
                    });
                }
            } else {
                // signup was successful
                setUser(user);
                // props.history.push('/');
            }
        });
    };

    return (
        <Form className={style.Form} onSubmit={handleSubmit}>
            <Form.Group>
                <label htmlFor="firstName">Name</label>
                <Form.Input
                    name="firstName"
                    type="firstName"
                    placeholder="Name"
                    value={signupForm.firstName}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="lastName">Last name</label>
                <Form.Input
                    name="lastName"
                    type="lastName"
                    placeholder="Last name"
                    value={signupForm.lastName}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="phoneNumber">Phone number</label>
                <Form.Input
                    name="phoneNumber"
                    type="phoneNumber"
                    placeholder="Phone number"
                    value={signupForm.phoneNum}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="email">Email</label>
                <Form.Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group>
                <label htmlFor="password">Password</label>
                <Form.Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <label htmlFor="password">Confirm password</label>
                <Form.Input
                    name="confirm"
                    type="password"
                    placeholder="confirm password"
                    value={signupForm.confirm}
                    onChange={handleChange}
                />
            </Form.Group>

            {message && <p style={{ color: 'red' }}>{message}</p>}
            <p>
                Do you already have an account?
                <button
                    onClick={() => {
                        setIsLogin(true);
                        setIsSignup(false);
                    }}
                >
                    Log in
                </button>
            </p>
            <Button primary type="submit">
                Sign up
            </Button>
        </Form>
    );
};

export default Signup;
