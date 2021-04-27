import React, { useState } from 'react';
import style from './CreateDropoff.module.css';
import useInput from '../../utils/useInput';
import { Form, Button, Row, Col } from 'bootstrap-4-react';
import { useForm } from 'react-hook-form';
import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios';
// import axios from '../../utils/axios';
const mapBoxAccessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';
const token = localStorage.getItem('token');

const CreateDropOff = ({ user, ...props }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useInput('');
    const [street, setStreet] = useInput('');
    const [houseNumber, setHouseNumber] = useInput('');
    const [city, setCity] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [openingTime, setOpeningTime] = useInput('');
    const [closingTime, setClosingTime] = useInput('');

    // console.log('openingTime', openingTime);
    // console.log('closingTime', closingTime);

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // event.preventDefault();
        console.log('data', data);
        const token = localStorage.getItem('token');

        const coordsQuery = await axios.get(
            ` https://api.mapbox.com/geocoding/v5/mapbox.places/${street},${houseNumber},${zipCode},${city}.json?types=address&access_token=${mapBoxAccessToken}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const lngLat = coordsQuery.data.features[0].center;

        const response = await axios.post(
            '/api/dropoffs/add',
            {
                name,
                street,
                city,
                houseNumber,
                zipCode,
                lngLat,
                openingTime,
                closingTime,
                createdBy: user,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('response', response.data);
        setMessage(response.data.message);
        setTimeout(() => {
            setMessage('');
            props.history.push('/');
        });
    };

    return (
        <div className={style.Container}>
            <Form onSubmit={handleSubmit(onSubmit)} className={style.Form}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0 10%',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        // marginLeft: '5%',
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
                        <Row className={style.Row}>
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
                        <Row className={style.Row}>
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
                            <Row className={style.Row}>
                                <Col>
                                    {/* <TimePicker
                                    start="08:30"
                                    end="12:30"
                                    step={30}
                                    value={openingTime}
                                    onChange={setOpeningTime}
                                    className={style.Inline}
                                /> */}
                                    <Form.Input
                                        {...register('openingTime', {
                                            required: true,
                                            minLength: 3,
                                        })}
                                        type="datetime-local"
                                        placeholder="Opening time"
                                        value={openingTime}
                                        onChange={setOpeningTime}
                                        className={style.Inline}
                                    />
                                    {errors.openingTime && (
                                        <span>This field is required</span>
                                    )}
                                </Col>
                                <Col>
                                    {/* <TimePicker
                                    start="14:30"
                                    end="18:30"
                                    step={30}
                                    value={closingTime}
                                    onChange={setClosingTime}
                                    className={style.Inline}
                                /> */}

                                    <Form.Input
                                        {...register('closingTime', {
                                            required: true,
                                            minLength: 3,
                                        })}
                                        type="datetime-local"
                                        placeholder="Closing time"
                                        value={closingTime}
                                        onChange={setClosingTime}
                                        className={style.Inline}
                                    />
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
