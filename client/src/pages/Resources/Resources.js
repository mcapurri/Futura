import React, { useState } from 'react';
// import style from './Resources.module.css';
import News from './News';
import Website from './Website';

const Resources = (props) => {
    console.log('propsResources', props.location);

    const [url, setUrl] = useState('');

    console.log('url', url);

    return (
        <>
            {url === '' ? (
                <News setUrl={setUrl} history={props.history} />
            ) : (
                <Website url={url} />
            )}
        </>
    );
};

export default Resources;
