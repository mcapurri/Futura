import React from 'react';
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js')
    .CognitiveServicesCredentials;
const WebSearchAPIClient = require('@azure/cognitiveservices-websearch');

const SearchArticles = () => {
    let credentials = new CognitiveServicesCredentials('YOUR-ACCESS-KEY');
    let webSearchApiClient = new WebSearchAPIClient(credentials);

    webSearchApiClient.web
        .search('seahawks')
        .then((result) => {
            let properties = ['images', 'webPages', 'news', 'videos'];
            for (let i = 0; i < properties.length; i++) {
                if (result[properties[i]]) {
                    console.log(result[properties[i]].value);
                } else {
                    console.log(`No ${properties[i]} data`);
                }
            }
        })
        .catch((err) => {
            throw err;
        });
    return <div></div>;
};

export default SearchArticles;
