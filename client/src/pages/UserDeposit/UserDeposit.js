import React, { useState, useEffect } from 'react';
import style from './UserDeposit.module.css';
import { useForm } from 'react-hook-form';
import useInput from '../../utils/useInput';
import { Form, Button } from 'bootstrap-4-react';
import axios from 'axios';

const UserDeposit = (props) => {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const [deposited, setDeposited] = useInput(0);
    const [location, setLocation] = useInput('');
    const [locationsList, setLocationsList] = useState([]);

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
                console.log('location', location);
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
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0 10%',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Form.Group
                            style={{
                                width: '100%',
                                margin: '0 5%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'space-between',
                            }}
                        >
                            {/* <Form.Input
                                {...register('name', {
                                    required: true,
                                    minLength: 3,
                                })}
                                type="text"
                                placeholder="Location name"
                                value={name}
                                onChange={setName}
                            /> */}
                            {errors.name && <span>This field is required</span>}

                            <Form.Select
                                {...register('location', {
                                    required: true,
                                })}
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                // className={style.TimePicker}
                            >
                                {locationsList}
                            </Form.Select>
                            {errors.name && <span>This field is required</span>}
                        </Form.Group>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserDeposit;
