import React, { useState, useEffect, useCallback, useMemo } from 'react';
import style from './Map.module.css';

import * as MapBoxGL from 'mapbox-gl';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import axios from 'axios';

import config from '../../utils/config.json';

import 'mapbox-gl/dist/mapbox-gl.css';

import { getBounds, getGeoJson } from '../../utils/map';

const MapBox = ReactMapboxGl({ accessToken: config.mapboxtoken });
const MapBoxStyle = 'mapbox://styles/mapbox/streets-v11';

const Map = () => {
    const [map, setMap] = useState();
    // const [mapHeight, setMapHeight] = useState('680px');
    const [dropOffs, setDropOffs] = useState([]);
    const [, setGeojson] = useState();

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
        setMap(e);
    }, []);

    let displayPopUp = '';
    const handleClickMarker = (e, el) => {
        console.log('clickEvent', el);
        return (displayPopUp = (
            <Popup
                // latitude={el.lngLat[1]}
                // longitude={el.lngLat[0]}
                coordinates={el.lngLat}
                closeButton={false}
                closeOnClick={true}
                offsetTop={-30}
            >
                <p>{el.name}</p>˜
                <p>
                    {el.street}, {el.houseNumber} - {el.zipCode}
                </p>
                <p>
                    Opening hours: {el?.openingTime} / {el?.closingTime}
                </p>
                ˜
            </Popup>
        ));
    };

    const markerRenderer = useMemo(
        () =>
            dropOffs.map((el) => (
                <Marker
                    key={el._id}
                    coordinates={el.lngLat}
                    className={style.Marker}
                    onClick={(e) => handleClickMarker(e, el)}
                />
            )),
        [dropOffs, handleClickMarker]
    );

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
    }, [map, dropOffs]);

    return (
        <>
            <MapBox
                className={style.Container}
                style={MapBoxStyle}
                center={[13.4, 52.52]}
                zoom={[15]}
                onStyleLoad={onLoadMap}
            >
                {markerRenderer}
                {displayPopUp}
            </MapBox>
        </>
    );
};

export default Map;
