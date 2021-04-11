import React, { useRef, useEffect, useState } from 'react';
import style from './Map.module.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';

const Map = () => {
    const mapContainer = useRef();

    const [viewport, setViewport] = useState({
        lng: 13.405,
        lat: 52.52,
        zoom: 10,
    });

    let lngLat;

    let address = async (lnglat) => {
        console.log('lngLat', lnglat);
        await axios
            .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lnglat.lng},${lnglat.lat}.json?access_token=${mapboxgl.accessToken}&cachebuster=1616347496121&autocomplete=true&types=address&types=place&`
            )
            .then((resAddress) => {
                console.log('resAddress', resAddress);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        const map = new mapboxgl.Map({
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
                // showUserLocation: true,
            })
        );

        // setting a popup
        // const popup = new mapboxgl.Popup({
        //     closeButton: false,
        // });
        // popup
        //     .setLngLat([13.455, 52.45])
        //     .setHTML('<span>Drop-off</span>')
        //     .setMaxWidth('200px')
        //     .addTo(map);

        // Geocoder
        // map.addControl(
        //     new MapboxGeocoder({
        //         accessToken: mapboxgl.accessToken,
        //         mapboxgl: mapboxgl,
        //     })
        // );
        map.on('move', () => {
            setViewport({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lng.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });
        const marker = new mapboxgl.Marker({
            scale: 1,
            color: 'red',
            draggable: true,
        });
        const addMarker = (event) => {
            // console.log(event.lngLat);
            marker
                .setLngLat(event.lngLat)
                .setPopup(
                    new mapboxgl.Popup({ closeButton: false }).setHTML(
                        '<h6>Drop-off</h6>'
                    )
                )
                .addTo(map);
            address(event.lngLat);
        };
        map.on('click', addMarker);

        const onDragEnd = () => {
            lngLat = marker.getLngLat();
            address(lngLat);
        };

        marker.on('dragend', onDragEnd);

        return () => map.remove();
    }, [lngLat]);

    return (
        <div>
            {/* <div className={style.Sidebar}>
                    Longitude: {berlin.lng} | Latitude: {berlin.lat} | Zoom:{' '}
                    {berlin.zoom}
                </div> */}
            <div className={style.Map} ref={mapContainer}></div>
        </div>
    );
};

export default Map;
