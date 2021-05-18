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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <div className={style.Avatar}>
                                        {props.user.avatar && (
                                            <img
                                                src={props.user.avatar}
                                                alt="user-avatar"
                                            />
                                        )}
                                    </div>
                                    <p
                                        style={{
                                            display: 'flex',
                                            alignSelf: 'flex-start',
                                            fontSize: '0.9rem',
                                        }}
                                    >
                                        {name} says:
                                    </p>
                                </div>
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
            </div>
            <div className={style.Lower}>
                <textarea
                    placeholder="Write message..."
                    className={style.Textarea}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} disabled={!newMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
