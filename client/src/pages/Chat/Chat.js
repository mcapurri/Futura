import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './Chat.module.css';

const Chat = (props) => {
    const [roomName, setRoomName] = useState('');

    return (
        <div className={style.Container}>
            <input
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className={style.Input}
            />
            <Link
                to={`/chat-room?name=${props.user.firstName}&room=${roomName}`}
                className={style.Button}
                onClick={(e) => !roomName && e.preventDefault()}
            >
                Join room
            </Link>
        </div>
    );
};

export default Chat;
