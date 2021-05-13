import React, { useState, useEffect, useCallback, useMemo } from 'react';
import style from './Map.module.css';

import * as MapBoxGL from 'mapbox-gl';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import axios from '../../utils/axios';

import { mapboxtoken } from '../../utils/config.json';

// import 'mapbox-gl/dist/mapbox-gl.css';

import { getBounds, getGeoJson } from '../../utils/map';

const MapBox = ReactMapboxGl({ accessToken: mapboxtoken });
const MapBoxStyle = 'mapbox://styles/mapbox/streets-v11';

const Map = () => {
    const [map, setMap] = useState();
    const [dropOffs, setDropOffs] = useState([]);
    const [, setGeojson] = useState();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const fetchDropOffs = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/dropoffs');

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

    const openPopup = (index) => {
        setSelectedIndex(index);
    };
    const closePopup = () => {
        setSelectedIndex(null);
    };

    const displayMarkers = useMemo(
        () =>
            dropOffs.map((el, index) => (
                <>
                    <Marker
                        key={el._id}
                        coordinates={el.lngLat}
                        className={style.Marker}
                        onClick={() => openPopup(el._id)}
                    />
                    {selectedIndex !== null && (
                        <Popup
                            key={index}
                            coordinates={el.lngLat}
                            onClose={closePopup}
                            closeButton={true}
                            closeOnClick={false}
                            offsetTop={-30}
                        >
                            <p>{el.name}</p>˜{' '}
                            <p>
                                {el.street}, {el.houseNumber} - {el.zipCode}{' '}
                            </p>{' '}
                            <p>
                                Opening hours: {el?.openingTime} /{' '}
                                {el?.closingTime}{' '}
                            </p>
                        </Popup>
                    )}
                </>
            )),
        [dropOffs, selectedIndex]
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
        <MapBox
            className={style.Container}
            style={MapBoxStyle}
            center={[13.4, 52.52]}
            zoom={[15]}
            onStyleLoad={onLoadMap}
        >
            {displayMarkers}
        </MapBox>
    );
};

export default Map;
