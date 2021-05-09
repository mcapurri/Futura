import React, { useState, useEffect } from 'react';
import style from './UserDeposit.module.css';
import { useForm } from 'react-hook-form';
import useInput from '../../utils/useInput';
import { Form, Button, Row, Col } from 'bootstrap-4-react';
import axios from 'axios';

const UserDeposit = (props) => {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState('');
    const [depositedGr, setDepositedGr] = useInput('');
    const [depositedKg, setDepositedKg] = useInput('');
    const [location, setLocation] = useInput('');
    const [locationsList, setLocationsList] = useState([]);
    const [email, setEmail] = useInput('');
    const credit = depositedGr + (depositedKg / 100) * 0.1;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const locations = await axios.get('/api/dropoffs', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('locations', locations.data);

            const options = locations.data.map((location) => {
                return (
                    <option key={location._id} value={location.name}>
                        {location.name}
                    </option>
                );
            });

            setLocationsList(options);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        console.log('data', data);
    };

    return (
        <div className={style.Container}>
            <header>
                <div className={style.Logo}>
                    <img
                        src="assets/africa-recycle-logo.png"
                        alt="recycle-logo"
                    />
                    <h1>!</h1>
                </div>
                {props.width > '600' && (
                    <p
                        style={{
                            marginRight: '15%',
                        }}
                    >
                        It's all about what you do for our future...{' '}
                    </p>
                )}
            </header>
            <div className={style.Form}>
                <Form onSubmit={handleSubmit(onSubmit)} className={style.Form}>
                    <div
                    // style={{
                    //     display: 'flex',
                    //     flexDirection: 'column',
                    //     padding: '0 10%',
                    //     alignItems: 'center',
                    //     width: '100%',
                    //     height: '100%',
                    // }}
                    >
                        <Form.Group
                        // style={{
                        //     width: '100%',
                        //     margin: '0 5%',
                        //     display: 'flex',
                        //     flexDirection: 'column',
                        //     alignItems: 'space-between',
                        // }}
                        >
                            <label htmlFor="location">Location</label>
                            <Form.Select
                                {...register('location', {
                                    required: true,
                                })}
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className={style.SelectInput}
                            >
                                <option>--- Select a location ---</option>
                                {locationsList}
                            </Form.Select>
                            {errors.name && <span>This field is required</span>}
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="email">Email</label>
                            <Form.Input
                                {...register('email', {
                                    required: true,
                                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                })}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={setEmail}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div className={style.Row}>
                                <div className={style.Col}>
                                    <label htmlFor="depositedKg">
                                        Deposit Kg.
                                    </label>
                                    <Form.Input
                                        {...register('depositedKg', {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Kilograms"
                                        value={depositedKg}
                                        onChange={setDepositedKg}
                                        className={style.Deposit}
                                    />
                                </div>

                                <div className={style.Col}>
                                    <label htmlFor="depositedGr"></label>
                                    <Form.Input
                                        {...register('depositedGr', {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Grams"
                                        value={depositedGr}
                                        onChange={setDepositedGr}
                                        className={style.Deposit}
                                        style={{ marginTop: '5.5%' }}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="credit">Credit $</label>
                            <Form.Input
                                {...register('credit', {
                                    required: true,
                                })}
                                type="text"
                                placeholder="Deposit Kg."
                                value={credit}
                                // onChange={setDeposited}
                            />
                        </Form.Group>
                    </div>
                    <p style={{ color: '#fff' }}>{message}</p>

                    <Button type="Submit">Add credit</Button>
                </Form>
            </div>
        </div>
    );
};

export default UserDeposit;
