import React from 'react';
import { AiFillHome as HomeLogo } from 'react-icons/ai';
import { FaBookOpen as ResourcesLogo } from 'react-icons/fa';
import { BsFillChatFill as ChatLogo } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                bottom: '0',
                height: '50px',
                position: 'fixed',
                backgroundColor: 'rgb(5, 58, 32)',
                width: '100%',
            }}
        >
            <Link to="/">
                <HomeLogo
                    style={{
                        fontSize: '2rem',
                        color: '#fff',
                    }}
                />
            </Link>
            <Link to="/chat">
                <ChatLogo
                    style={{
                        fontSize: '2rem',
                        color: '#fff',
                    }}
                />
            </Link>
            <Link to="/resources/news">
                <ResourcesLogo
                    style={{
                        fontSize: '2rem',
                        color: '#fff',
                    }}
                />
            </Link>
        </div>
    );
};

export default Footer;
