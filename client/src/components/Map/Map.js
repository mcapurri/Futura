import React, { useState, useEffect, useCallback, useMemo } from 'react';
import style from './Map.module.css';

import * as MapBoxGL from 'mapbox-gl';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';

import axios from '../../utils/axios';

import { mapboxtoken } from '../../utils/config.json';

// import 'mapbox-gl/dist/mapbox-gl.css';

import { getBounds, getGeoJson } from '../../utils/map';

const MapBox = ReactMapboxGl({
    accessToken: mapboxtoken,
    // className: style.Canvas,
    // style: 'mapbox://styles/mapbox/streets-v11',
});
const MapBoxStyle = 'mapbox://styles/mapbox/streets-v11';

const Map = ({ setIsMapPage }) => {
    const [map, setMap] = useState();
    const [dropOffs, setDropOffs] = useState([]);
    const [geojson, setGeojson] = useState({});
    console.log('geojson', geojson);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        setIsMapPage(true);
        return () => {
            setIsMapPage(false);
        };
    }, []);

    const fetchDropOffs = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/dropoffs');

            setDropOffs(data);
            const geojsonData = await getGeoJson(data);
            setGeojson({ type: 'geojson', data: geojsonData });
        } catch (err) {
            console.log(err);
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
            geojson.data &&
            geojson.data.map((el, index) => (
                <div key={el.key}>
                    {/* {console.log('el', el)} */}
                    <Marker
                        coordinates={el.geometry.coordinates}
                        className={style.Marker}
                        onClick={() => openPopup(el.key)}
                    />
                    {console.log(selectedIndex === el.key)}
                    {selectedIndex !== null && selectedIndex === el.key && (
                        <Popup
                            visible={selectedIndex === el.key}
                            coordinates={el.geometry.coordinates}
                            onClose={closePopup}
                            closeButton={true}
                            closeOnClick={true}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: 'rgb(5, 58, 32)',
                            }}
                        >
                            <p style={{ fontWeight: '500' }}>
                                {el.properties.name}
                            </p>{' '}
                            <p>
                                {el.properties.street},{' '}
                                {el.properties.houseNumber} -{' '}
                                {el.properties.zipCode}{' '}
                            </p>{' '}
                            <p>
                                Opening hours: {el?.properties.openingTime} /{' '}
                                {el?.properties.closingTime}{' '}
                            </p>
                        </Popup>
                    )}
                </div>
            )),
        [geojson, selectedIndex]
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
        setGeojson({ type: 'geojson', data: data.features });
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
            height={'100%'}
            onStyleLoad={onLoadMap}
        >
            {displayMarkers}
        </MapBox>
    );
};

export default Map;
