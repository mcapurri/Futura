import React, { useState } from 'react';
import style from './ChatRoom.module.css';
import useChat from '../../../utils/useChat';

const ChatRoom = (props) => {
    const { messages, sendMessage, name, room } = useChat(props);
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
                            <p
                                style={{
                                    display: 'flex',
                                    alignSelf: 'flex-start',
                                }}
                            >
                                {name} says:
                            </p>
                            <p
                                style={{
                                    fontWeight: '700',
                                    marginBottom: '0',
                                }}
                            >
                                {message.body}
                            </p>
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
            <button onClick={handleSendMessage} disabled={!newMessage}>
                Send
            </button>
        </div>
    );
};

export default ChatRoom;
