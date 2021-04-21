import React, { useState, useEffect, useCallback } from 'react';
import style from './Map.module.css';
import * as MapBoxGL from 'mapbox-gl';
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl';

import axios from 'axios';

import config from '../../utils/config.json';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.module.css';

import { getBounds, getGeoJson } from '../../utils/map';

// import recyclingLogo from '../../assets/recycling-logo.png';
import recyclingLogo from '../../assets/recycling-15.svg';

const MapBox = ReactMapboxGl({ accessToken: config.mapboxtoken });
const MapBoxStyle = 'mapbox://styles/mapbox/streets-v11';

const layerStyle = {
    'circle-radius': 8,
    'circle-color': 'black',
};

const Map = () => {
    const [map, setMap] = useState();
    const [mapHeight, setMapHeight] = useState('740px');
    const [dropOffs, setDropOffs] = useState([]);
    const [geojson, setGeojson] = useState();
    console.log('geojson', geojson);

    const fetchDropOffs = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/dropoffs', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDropOffs(data);
            const geojsonData = getGeoJson(data);
            setGeojson({ type: 'geojson', data: geojsonData });
        } catch (err) {
            console.log('fetchDropOffs: ', err);
        }
    }, []);

    const onLoadMap = useCallback((e) => {
        console.log('e', e);
        setMap(e);
    }, []);

    // useEffect(() => {
    //     const height = window.innerHeight - 50;
    //     setMapHeight(`${height}px`);
    // }, []);

    useEffect(() => {
        fetchDropOffs();
    }, [fetchDropOffs]);

    useEffect(() => {
        map?.addControl(
            new MapBoxGL.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserLocation: true,
            })
        );
    }, [map]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (data) => {
                    const {
                        coords: { longitude: lng, latitude: lat },
                    } = data;

                    map?.setCenter([lng, lat]);
                },
                (err) => {
                    console.log('err: ', err);
                }
            );
        }
    }, [map]);

    useEffect(() => {
        if (dropOffs.length <= 1) return;

        const bounds = getBounds(dropOffs);
        map?.fitBounds(bounds);
        console.log('bounds: ', bounds);
    }, [map, dropOffs]);

    // const onClickLayer = useCallback((e) => {}, []);

    const onClickLayer = useCallback(
        (e) => {
            const property = e.features[0].properties;
            console.log('property', property);
            new MapBoxGL.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                    <>
                        <span>${property.title}</span>
                        <span>${property.description}</span>
                    </>
                )
                .addTo(map);
        },
        [map]
    );

    // const displayLayers = () => {
    //     const layers = geojson.features.forEach(function (marker) {
    //         // create a DOM element for the marker
    //         const el = document.createElement('div');
    //         el.className = 'Marker';
    //         el.style.backgroundImage =
    //             'url(assets/recycling-logo.png/' +
    //             marker.properties.iconSize.join('/') +
    //             '/)';
    //         el.style.width = marker.properties.iconSize[0] + 'px';
    //         el.style.height = marker.properties.iconSize[1] + 'px';
    //         el.style.backgroundSize = '100%';

    //         el.addEventListener('click', function () {
    //             window.alert(marker.properties.message);
    //         });

    //         // add marker to map
    //         // new MapBoxGL.Marker(el)
    //         //     .setLngLat(marker.geometry.coordinates)
    //         //     .addTo(map);
    //         return (
    //             <Layer
    //                 className={style.Marker}
    //                 // id="Marker"
    //                 type="circle"
    //                 id="drop-off-layer"
    //                 // type="symbol"
    //                 sourceId="drop-off-src"
    //                 // paint={layerStyle}
    //                 // layout={{ 'icon-image': 'recycling-15' }}
    //                 onClick={onClickLayer}
    //             />
    //         );
    //     });
    //     return layers;
    // };

    return (
        <>
            <MapBox
                // eslint-disable-next-line react/style-prop-object
                style={MapBoxStyle}
                center={[13.4, 52.52]}
                zoom={[15]}
                className={style.Container}
                onStyleLoad={onLoadMap}
            >
                <Source id="drop-off-src" geoJsonSource={geojson} />
                <Layer
                    id={style.Marker}
                    type="circle"
                    // id="drop-off-layer"
                    // type="symbol"
                    sourceId="drop-off-src"
                    // paint={layerStyle}
                    // layout={{
                    //     'icon-image': `${recyclingLogo}`,
                    //     'icon-size': 1.5,
                    // }}
                    onClick={onClickLayer}
                />
                {/* {displayLayers} */}
            </MapBox>
        </>
    );
};

export default Map;
