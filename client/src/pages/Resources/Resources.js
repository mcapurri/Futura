import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Resources.module.css';
import { Card, Container, Col } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const Resources = () => {
    const [newsList, setNewsList] = useState('');

    const fetchData = () => {
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
                // console.log(response.data);
                setNewsList(response.data.value);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log('newsList', newsList);

    const displayNews = (newsArr) => {
        return newsArr.map((news) => {
            console.log('news', news);
            return (
                <Card key={news.url} style={{ width: '18rem', margin: '5% 0' }}>
                    {news.image && (
                        <img
                            src={news.image.thumbnail.contentUrl}
                            style={{ maxHeight: '15rem' }}
                        />
                    )}
                    <Card.Body>
                        <Card.Title>{news.name}</Card.Title>
                        <Card.Text>{news.description}</Card.Text>
                        <Link to={news.url}>Read Article</Link>
                    </Card.Body>
                </Card>
            );
        });
    };

    return (
        <div className={style.Resources}>
            <Container fluid={true}>
                <Col className="justify-content-around">
                    {displayNews([...newsList])}
                </Col>
            </Container>
            <Footer />
        </div>
    );
};

export default Resources;
