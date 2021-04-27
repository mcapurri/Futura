import React, { useState } from 'react';
import style from './CreateDropoff.module.css';
import useInput from '../../utils/useInput';
import { Form, Button, Row, Col } from 'bootstrap-4-react';
// import { Form, Button, Row, Col } from 'react-bootstrap';
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

    // console.log('token', token);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                            type="text"
                            placeholder="Location name"
                            value={name}
                            onChange={setName}
                        />
                        <Row className={style.Row}>
                            <Col>
                                <Form.Input
                                    type="text"
                                    placeholder="Street"
                                    value={street}
                                    onChange={setStreet}
                                    className={style.Long}
                                />
                            </Col>
                            <Col>
                                <Form.Input
                                    type="text"
                                    placeholder="House num."
                                    value={houseNumber}
                                    onChange={setHouseNumber}
                                    className={style.Short}
                                />
                            </Col>
                        </Row>
                        <Row className={style.Row}>
                            <Col>
                                <Form.Input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={setCity}
                                    className={style.Long}
                                />
                            </Col>
                            <Col>
                                <Form.Input
                                    type="text"
                                    placeholder="ZIP Code"
                                    value={zipCode}
                                    onChange={setZipCode}
                                    className={style.Short}
                                />
                            </Col>
                        </Row>

                        <Row className={style.Row}>
                            <Col>
                                {' '}
                                <Form.Input
                                    type="datetime-local"
                                    placeholder="Opening time"
                                    value={openingTime}
                                    onChange={setOpeningTime}
                                    className={style.Inline}
                                />
                            </Col>
                            <Col>
                                <Form.Input
                                    type="datetime-local"
                                    placeholder="Closing time"
                                    value={closingTime}
                                    onChange={setClosingTime}
                                    className={style.Inline}
                                />
                            </Col>
                        </Row>
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
