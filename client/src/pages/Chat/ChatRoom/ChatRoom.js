import React, { useState } from 'react';
import style from './ChatRoom.module.css';
import useChat from '../../../utils/useChat';

const ChatRoom = (props) => {
    const { roomId } = props.match.params;
    const { messages, sendMessage, room } = useChat(props);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className={style.Container}>
            <h1 className={style.Name}>Room: {room}</h1>
            <div className={style.Messages}>
                <ol className={style.MessagesList}>
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            className={`${style.Item} ${
                                message.ownedByCurrentUser
                                    ? style.MyMessage
                                    : style.ReceivedMessage
                            }`}
                        >
                            {message.body}
                        </li>
                    ))}
                </ol>
            </div>
            <textarea
                placeholder="Write message..."
                className={style.newMessage}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className={style.Button}>
                Send
            </button>
        </div>
    );
};

export default ChatRoom;
