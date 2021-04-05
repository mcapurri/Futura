import React, { useState } from 'react';
// import style from './Resources.module.css';
import Footer from '../../components/Footer/Footer';
import News from './News';
import Website from './Website';

const Resources = (props) => {
    console.log('propsResources', props.location);
    // let url;
    // {
    //     props.location.state !== undefined && (url = props.location.state.url);
    // }
    // console.log('urlResources', url);
    // const [isNews, setIsNews] = useState(true);
    const [url, setUrl] = useState('');

    console.log('url', url);

    return (
        <>
            {url === '' ? (
                <News setUrl={setUrl} history={props.history} />
            ) : (
                <Website url={url} />
            )}
            <Footer />
        </>
    );
};

export default Resources;
