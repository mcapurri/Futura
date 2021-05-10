import React, { useState } from 'react';
import style from './CreateDropoff.module.css';
import useInput from '../../utils/useInput';
import { Form, Button, Row, Col } from 'bootstrap-4-react';
import { useForm } from 'react-hook-form';
import axios from '../../utils/axios';
import { mapboxtoken } from '../../utils/config.json';

const CreateDropOff = ({ user, ...props }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useInput('');
    const [street, setStreet] = useInput('');
    const [houseNumber, setHouseNumber] = useInput('');
    const [city, setCity] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // event.preventDefault();
        console.log('data', data);

        const coordsQuery = await axios.get(
            ` https://api.mapbox.com/geocoding/v5/mapbox.places/${street},${houseNumber},${zipCode},${city}.json?types=address&access_token=${mapboxtoken}`
        );
        const lngLat = coordsQuery.data.features[0].center;

        const response = await axios.post('/api/dropoffs/add', {
            name,
            street,
            city,
            houseNumber,
            zipCode,
            lngLat,
            openingTime,
            closingTime,
            createdBy: user,
        });
        if (response) {
            console.log('response', response.data);
            setMessage(response.data.message);
            setTimeout(() => {
                setMessage('');
                props.history.push('/');
            }, 3000);
        }
    };

    return (
        <div className={style.Container}>
            <header>
                <img
                    src="../../assets/africa-recycle-logo.png"
                    alt="recycling-logo"
                />
                <div>
                    <p>
                        Help the community and start a new recycling point
                        today!
                    </p>
                    <p>
                        Fill the form and add all the details of the new
                        location.
                    </p>
                    <p>
                        Soon our Team will contact you to validate your idoneity
                        and will abilitate your new Futura recycling point!
                    </p>
                </div>
            </header>
            <section></section>
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
                        <Form.Input
                            {...register('name', {
                                required: true,
                                minLength: 3,
                            })}
                            type="text"
                            placeholder="Location name"
                            value={name}
                            onChange={setName}
                        />
                        {errors.name && <span>This field is required</span>}
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Input
                                    {...register('street', {
                                        required: true,
                                        minLength: 3,
                                    })}
                                    type="text"
                                    placeholder="Street"
                                    value={street}
                                    onChange={setStreet}
                                    className={style.Long}
                                />
                                {errors.street && (
                                    <span>This field is required</span>
                                )}
                            </Col>
                            <Col>
                                <Form.Input
                                    {...register('houseNumber', {
                                        required: true,
                                        minLength: 1,
                                    })}
                                    type="text"
                                    placeholder="House num."
                                    value={houseNumber}
                                    onChange={setHouseNumber}
                                    className={style.Short}
                                />
                                {errors.houseNumber && (
                                    <span>This field is required</span>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Input
                                    {...register('city', {
                                        required: true,
                                        minLength: 3,
                                    })}
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={setCity}
                                    className={style.Long}
                                />
                                {errors.city && (
                                    <span>This field is required</span>
                                )}
                            </Col>
                            <Col>
                                <Form.Input
                                    {...register('zipCode', {
                                        required: true,
                                        minLength: 5,
                                        maxLength: 5,
                                    })}
                                    type="text"
                                    placeholder="ZIP Code"
                                    value={zipCode}
                                    onChange={setZipCode}
                                    className={style.Short}
                                />
                                {errors.zipCode && (
                                    <span>This field is required</span>
                                )}
                            </Col>
                        </Row>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <label htmlFor="openingTime">Opening</label>

                                    <Form.Select
                                        {...register('openingTime', {
                                            required: true,
                                        })}
                                        type="datetime-local"
                                        placeholder="Opening time"
                                        value={openingTime}
                                        onChange={(e) =>
                                            setOpeningTime(e.target.value)
                                        }
                                        className={style.TimePicker}
                                    >
                                        <option>--Select time--</option>
                                        <option value="0900">09.00</option>
                                        <option value="0930">09.30</option>
                                        <option value="1000">10.00</option>
                                        <option value="1030">10.30</option>
                                        <option value="1100">11.00</option>
                                        <option value="1130">11.30</option>
                                        <option value="1200">12.00</option>
                                        <option value="1230">12.30</option>
                                    </Form.Select>
                                    {errors.openingTime && (
                                        <span>This field is required</span>
                                    )}
                                </Col>
                                <Col>
                                    <label htmlFor="closingTime">Closing</label>

                                    <Form.Select
                                        {...register('closingTime', {
                                            required: true,
                                        })}
                                        type="datetime-local"
                                        placeholder="Closing time"
                                        value={closingTime}
                                        onChange={(e) =>
                                            setClosingTime(e.target.value)
                                        }
                                        className={style.TimePicker}
                                    >
                                        <option>--Select time--</option>
                                        <option value="1600">16.00</option>
                                        <option value="1630">16.30</option>
                                        <option value="1700">17.00</option>
                                        <option value="1730">17.30</option>
                                        <option value="1800">18.00</option>
                                        <option value="1830">18.30</option>
                                        <option value="1900">19.00</option>
                                        <option value="1930">19.30</option>
                                    </Form.Select>
                                    {errors.closingTime && (
                                        <span>This field is required</span>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form.Group>

                    <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                    <Button primary type="submit">
                        Create Drop-Off
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateDropOff;
