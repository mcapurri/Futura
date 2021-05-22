import { useEffect, useRef, useState } from 'react';
import ioClient from 'socket.io-client';
import queryString from 'query-string';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const ENDPOINT = process.env.ORIGIN;

const useChat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const token = localStorage.getItem('token');
    // console.log(name, room);

    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search);
        setName(name);
        setRoom(room);
        socketRef.current = ioClient(ENDPOINT, {
            query: { name, room },
        });
        // console.log('socketRef', socketRef.current);

        socketRef.current.on(
            NEW_CHAT_MESSAGE_EVENT,
            (message) => {
                const incomingMessage = {
                    ...message,
                    ownedByCurrentUser:
                        message.senderId === socketRef.current.id,
                };
                setMessages((messages) => [...messages, incomingMessage]);
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return () => {
            socketRef.current.disconnect();
        };
    }, [props.location.search, token]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage, name, room };
};

export default useChat;
