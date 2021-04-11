import React, { useState } from 'react';
import style from './CreateDropoff.module.css';
import useInput from '../../utils/useInput';
import { Form, Button } from 'bootstrap-4-react';
import axios from 'axios';

const CreateDropOff = ({ user, ...props }) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useInput('');
    const [street, setStreet] = useInput('');
    const [city, setCity] = useInput('');
    const [zipCode, setZipCode] = useInput('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/api/dropoffs/add', {
            name,
            street,
            city,
            zipCode,
            createdBy: user,
        });
        console.log('response', response.data);
        setMessage(response.data.message);
        setName('');
        setStreet('');
        setCity('');
        setZipCode('');
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
