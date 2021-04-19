import React, { useRef, useEffect, useState } from 'react';
import style from './Map.module.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';
const token = localStorage.getItem('token');

const Map = () => {
    const mapContainer = useRef();
    const [dropOffs, setDropOffs] = useState('');
    const [viewport, setViewport] = useState({
        lng: 13.405,
        lat: 52.52,
        zoom: 13,
    });

    console.log('viewport', viewport);
    console.log('dropOffs', dropOffs);

    // let lngLat;

    // let address = async (lnglat) => {
    //     console.log('lngLat', lnglat);
    //     await axios
    //         .get(
    //             `https://api.mapbox.com/geocoding/v5/mapbox.places/${lnglat.lng},${lnglat.lat}.json?access_token=${mapboxgl.accessToken}&cachebuster=1616347496121&autocomplete=true&types=address&types=place&`
    //         )
    //         .then((resAddress) => {
    //             console.log('resAddress', resAddress);
    //         })
    //         .catch((err) => console.log(err));
    // };

    const fetchDropOffs = async () => {
        try {
            const dropOffsFromDB = await axios.get('/api/dropoffs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDropOffs(dropOffsFromDB.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDropOffs();
    }, []);

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [viewport.lng, viewport.lat],
            zoom: viewport.zoom,
        });
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserLocation: true,
            })
        );
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (data) => {
                    // console.log('data', data);
                    setViewport({
                        lng: data.coords.longitude,
                        lat: data.coords.latitude,
                    });
                    // map.remove();
                    // map = new mapboxgl.Map({
                    //     container: mapContainer.current,
                    //     style: 'mapbox://styles/mapbox/streets-v11',
                    //     center: [data.coords.longitude, data.coords.latitude],
                    //     zoom: viewport.zoom,
                    // });
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        map.on('move', () => {
            setViewport({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });

        const marker = new mapboxgl.Marker({
            scale: 1,
            color: 'red',
            // draggable: true,
        });

        // const features = dropOffs?.map((dropOff) => {
        //     return {
        //         type: 'Feature',
        //         properties: {
        //             message: 'Drop-Off',
        //             iconSize: [60, 60],
        //         },
        //         geometry: {
        //             type: 'Point',
        //             coordinates: [dropOff.lngLat[0], dropOff.lngLat[1]],
        //         },
        //     };
        // });

        // const geojson = {
        //     type: 'FeatureCollection',
        //     features: features,
        // };

        // geojson.features.forEach((marker) => {
        //     new mapboxgl.Marker()
        //         .setLngLat(marker.geometry.coordinates)
        //         .addTo(map);
        // });

        return () => map.remove();
    }, []);

    if (!viewport) return <Spinner />;

    return (
        <div>
            <div className={style.Map} ref={mapContainer}></div>
        </div>
    );
};

export default Map;
