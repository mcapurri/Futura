import React from 'react';
import { AiFillHome as HomeLogo } from 'react-icons/ai';
import { BsChatFill as ChatLogo } from 'react-icons/bs';
import { FaBookOpen as ResourcesLogo } from 'react-icons/fa';

const Footer = () => {
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
            <HomeLogo
                style={{
                    fontSize: '2rem',
                }}
                // onClick={}
            />
            <ChatLogo
                style={{
                    fontSize: '2rem',
                }}
                // onClick={}
            />
            <ResourcesLogo
                style={{
                    fontSize: '2rem',
                }}
                // onClick={}
            />
        </div>
    );
};

export default Footer;
