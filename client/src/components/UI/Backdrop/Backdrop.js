import React from 'react';

const Backdrop = ({ toggleDrawer }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: '100',
                right: '0',
                top: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onClick={toggleDrawer}
        ></div>
    );
};

export default Backdrop;
