import React, { useState } from 'react';
import style from './CreateDropoff.module.css';
import useInput from '../../utils/useInput';
import { Form, Button } from 'bootstrap-4-react';
import axios from 'axios';
// import axios from '../../utils/axios';
const mapBoxAccessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';

// axios.interceptors.request.use(
//     (config) => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = ['http://localhost:3000'];
//         const token = localStorage.getItem('token');
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

const token = localStorage.getItem('token');

const CreateDropOff = ({ user, ...props }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useInput('');
    const [street, setStreet] = useInput('');
    const [houseNumber, setHouseNumber] = useInput('');
    const [city, setCity] = useInput('');
    const [zipCode, setZipCode] = useInput('');

    // console.log('token', token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const coordsQuery = await axios.get(
            ` https://api.mapbox.com/geocoding/v5/mapbox.places/${street},${houseNumber},${zipCode},${city}.json?types=address&access_token=${mapBoxAccessToken}`
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
            <Form onSubmit={handleSubmit} className={style.Form}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        marginLeft: '5%',
                    }}
                >
                    <Form.Group>
                        <div>
                            <Form.Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={setName}
                            />
                        </div>
                        <div>
                            <Form.Input
                                type="text"
                                placeholder="Street"
                                value={street}
                                onChange={setStreet}
                            />
                        </div>
                        <div>
                            <Form.Input
                                type="text"
                                placeholder="House num."
                                value={houseNumber}
                                onChange={setHouseNumber}
                            />
                        </div>
                        <div>
                            <Form.Input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={setCity}
                            />
                        </div>
                        <div>
                            <Form.Input
                                type="text"
                                placeholder="ZIP Code"
                                value={zipCode}
                                onChange={setZipCode}
                            />
                        </div>
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
