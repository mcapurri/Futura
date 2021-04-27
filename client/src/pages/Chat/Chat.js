import React from 'react';
import { Link } from 'react-router-dom';

import style from './Chat.module.css';

const Chat = () => {
    const [roomName, setRoomName] = React.useState('');

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    return (
        <div className={style.Container}>
            <input
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className={style.Input}
            />
            <Link to={`/chat/${roomName}`} className={style.Button}>
                Join room
            </Link>
        </div>
    );
};

export default Chat;
