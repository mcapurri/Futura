import React from 'react';
import Footer from '../../components/Footer/Footer';

const Website = (props) => {
    const url = props.location.state.url;
    return (
        <div>
            <iframe
                src={url}
                frameBorder="0"
                style={{ width: '100%', height: '100vh' }}
            ></iframe>
            <Footer />
        </div>
    );
};

export default Website;
