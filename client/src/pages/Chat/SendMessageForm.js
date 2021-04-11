import React from 'react';

const MessageList = (props) => {
    console.log('props', props);
    return (
        <ul className="message-list">
            {/* {props.messages.map((message, index) => {
                return (
                    <li key={message.id} className="message">
                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                    </li>
                );
            })} */}
        </ul>
    );
};

export default MessageList;
