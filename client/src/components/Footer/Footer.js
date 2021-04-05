import React from 'react';
import { AiFillHome as HomeLogo } from 'react-icons/ai';
import { BsChatFill as ChatLogo } from 'react-icons/bs';
import { FaBookOpen as ResourcesLogo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                // position: 'fixed',
                bottom: '0',
                height: '50px',
                position: 'absolute',
                backgroundColor: 'rgb(13, 122, 177)',
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
