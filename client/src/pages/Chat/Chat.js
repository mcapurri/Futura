// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:5005');

const Chat = () => {
    // const [state, setState] = useState({
    //     msg: '',
    //     chat: [],
    //     nickname: '',
    // });
    // useEffect(() => {
    //     socket.on('chat message', ({ nickname, msg }) => {
    //         setState({ ...state, chat: [...state.chat, { nickname, msg }] });
    //     });
    // }, []);
    // const handleChange = (e) => {
    //     setState({ ...state, [e.target.name]: e.target.value });
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { nickname, msg } = state;
    //     socket.emit('chat message', { nickname, msg });
    //     setState({ ...state, msg: '' });
    // };
    // const renderChat = () => {
    //     const { chat } = state;
    //     return chat.map(({ nickname, msg }, idx) => (
    //         <div key={idx}>
    //             <span style={{ color: 'green' }}>{nickname}: </span>
    //             <span>{msg}</span>
    //         </div>
    //     ));
    // };
    return (
        <div>
            <h1>Chat</h1>
            {/* <span>Nickname</span>
            <input
                name="nickname"
                onChange={handleChange}
                value={state.nickname}
            />
            <span>Message</span>
            <input name="msg" onChange={handleChange} value={state.msg} />
            <button onClick={handleSubmit}>Send</button>
            <div>{renderChat}</div> */}
        </div>
    );
};

export default Chat;
