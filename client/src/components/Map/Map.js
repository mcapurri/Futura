import React, { useState, useEffect, useCallback } from 'react';

import * as MapBoxGL from 'mapbox-gl';
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl';

import axios from 'axios';

import config from '../../utils/config.json';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.module.css';

import { getBounds, getGeoJson } from '../../utils/map';
import { AiOutlineLogout } from 'react-icons/ai';

const MapBox = ReactMapboxGl({ accessToken: config.mapboxtoken });
const MapBoxStyle = 'mapbox://styles/mapbox/streets-v11';

const layerStyle = {
    'circle-radius': 8,
    // 'circle-color': 'black',
    'backgroung-image': "src('/assets/recycling-logo.png')",
};

const Map = () => {
    const [map, setMap] = useState();
    const [mapHeight, setMapHeight] = useState('680px');
    const [dropOffs, setDropOffs] = useState([]);
    const [geojson, setGeojson] = useState();

    const fetchDropOffs = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('/api/dropoffs', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setDropOffs(data);
        } catch (err) {
            console.log('fetchDropOffs: ', err);
        }
    }, []);

    const onLoadMap = useCallback((e) => {
        setMap(e);
    }, []);

    useEffect(() => {
        const height = window.innerHeight - 50;
        setMapHeight(`${height}px`);
    }, []);

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
        const data = getGeoJson(dropOffs);
        setGeojson({ type: 'geojson', data: data });
    }, [dropOffs]);

    useEffect(() => {
        if (dropOffs.length <= 1) return;

        const bounds = getBounds(dropOffs);
        map?.fitBounds(bounds);
        console.log('bounds: ', bounds);
    }, [map, dropOffs]);

    return (
        <>
            <MapBox
                // eslint-disable-next-line react/style-prop-object
                style={MapBoxStyle}
                containerStyle={{
                    height: mapHeight,
                    width: '100%',
                }}
                onStyleLoad={onLoadMap}
            >
                <Source id="drop-off-src" geoJsonSource={geojson} />
                <Layer
                    type="circle"
                    id="drop-off-layer"
                    sourceId="drop-off-src"
                    // paint={layerStyle}
                >
                    <img src="/assets/recynglic-logo" alt="recycling-logo" />
                </Layer>
            </MapBox>
        </>
    );
};

export default Map;
