import React, { useState } from 'react';

const SendMessageForm = (props) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.sendMessage(message);
        setMessage('');
    };
    return (
        <form onSubmit={handleSubmit} className="send-message-form">
            <input
                onChange={handleChange}
                value={message}
                placeholder="Type your message and hit ENTER"
                type="text"
            />
        </form>
    );
};

export default SendMessageForm;
