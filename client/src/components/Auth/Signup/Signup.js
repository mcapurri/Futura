import React, { useState } from 'react';
import style from './Signup.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { signup } from '../../../utils/auth';

const Signup = ({ setIsSignup, user, setUser, handleLogout, ...props }) => {
    const [message, setMessage] = useState('');

    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirm: '',
        street: '',
        city: '',
        zipCode: '',
        state: '',
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
            street: signupForm.street,
            zipCode: signupForm.zipCode,
            city: signupForm.city,
            state: signupForm.state,
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
            }
        });
    };

    return (
        <div className={style.Home}>
            <header>
                <img src="assets/sea-img.png" alt="sea-img" />
            </header>
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
                <Form.Group>
                    <label htmlFor="street">Street</label>
                    <Form.Input
                        name="street"
                        type="text"
                        placeholder="Street"
                        value={signupForm.street}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="city">City</label>
                    <Form.Input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={signupForm.city}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="zipCode">ZIP Code</label>
                    <Form.Input
                        name="zipCode"
                        type="text"
                        placeholder="ZIP Code"
                        value={signupForm.zipCode}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="state">State</label>
                    <Form.Input
                        name="state"
                        type="text"
                        placeholder="State"
                        value={signupForm.state}
                        onChange={handleChange}
                    />
                </Form.Group>

                <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                <p>
                    Do you already have an account?
                    <button
                        onClick={() => {
                            // setIsSignup(false);
                            props.history.push('/');
                        }}
                    >
                        Log in
                    </button>
                </p>
                <Button primary type="submit">
                    Sign up
                </Button>
            </Form>
        </div>
    );
};

export default Signup;
