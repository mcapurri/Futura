import React from 'react';
import axios from 'axios';
import style from './Resources.module.css';

const Resources = () => {
    const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
            q: 'recycling africa',
            freshness: 'Day',
            textFormat: 'Raw',
            safeSearch: 'Off',
        },
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-key':
                'e855f8934amshaea2adbe9d42120p167129jsn01b5d102db6f',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        },
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    return <div className={style.Resources}>Hello resources</div>;
};

export default Resources;
