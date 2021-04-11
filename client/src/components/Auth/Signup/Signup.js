import React, { useState } from 'react';
import style from './Signup.module.css';
import { Form, Button } from 'bootstrap-4-react';
import { signup } from '../../../utils/auth';
import useInput from '../../../utils/useInput';

const Signup = ({ setIsSignup, user, setUser, ...props }) => {
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useInput('');
    const [lastName, setLastName] = useInput('');
    const [phoneNumber, setPhoneNumber] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [confirm, setConfirm] = useInput('');
    const [street, setStreet] = useInput('');
    const [city, setCity] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [state, setState] = useInput('');

    const handleSubmit = (event) => {
        event.preventDefault();

        signup({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirm: confirm,
            street: street,
            zipCode: zipCode,
            city: city,
            state: state,
            phoneNumber: phoneNumber,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                // Reset input values
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setConfirm('');
                setStreet('');
                setCity('');
                setZipCode('');
                setState('');
            } else {
                // signup was successful
                setUser(user);
                props.history.push('/');
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
                        value={firstName}
                        onChange={setFirstName}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="lastName">Last name</label>
                    <Form.Input
                        name="lastName"
                        type="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={setLastName}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <Form.Input
                        name="phoneNumber"
                        type="phoneNumber"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />
                </Form.Group>
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
                <Form.Group>
                    <label htmlFor="password">Confirm password</label>
                    <Form.Input
                        name="confirm"
                        type="password"
                        placeholder="confirm password"
                        value={confirm}
                        onChange={setConfirm}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="street">Street</label>
                    <Form.Input
                        name="street"
                        type="text"
                        placeholder="Street"
                        value={street}
                        onChange={setStreet}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="city">City</label>
                    <Form.Input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={setCity}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="zipCode">ZIP Code</label>
                    <Form.Input
                        name="zipCode"
                        type="text"
                        placeholder="ZIP Code"
                        value={zipCode}
                        onChange={setZipCode}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="state">State</label>
                    <Form.Input
                        name="state"
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={setState}
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
