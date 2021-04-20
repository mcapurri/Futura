import * as MapBoxGL from 'mapbox-gl';
import { FaMapMarkedAlt } from 'react-icons/fa';

export const getBounds = (points) => {
    const bounds = new MapBoxGL.LngLatBounds();
    points.forEach(({ lngLat }) => {
        bounds.extend(lngLat);
    });
    return bounds;
};

export const getGeoJson = (list) => {
    console.log('Geojson list', list);
    const features = [...list].map((marker) => {
        // console.log('marker', marker);
        const feature = {
            type: 'Feature',
            properties: {
                title: marker.name,
                description: `${marker.street}  ${marker.houseNumber}, ${marker.zipCode}`,
            },
            geometry: { type: 'Point', coordinates: marker.lngLat },
        };

        return feature;
    });

    return { features, type: 'FeatureCollection' };
};
