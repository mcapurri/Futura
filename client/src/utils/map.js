import * as MapBoxGL from "mapbox-gl";

export const getBounds = (points) => {
  const bounds = new MapBoxGL.LngLatBounds();
  points.forEach(({ lngLat }) => {
    bounds.extend(lngLat);
  });
  return bounds;
};

export const getGeoJson = (list) => {
  // console.log('Geojson list', list);
  const features = [...list].map((marker, index) => {
    // console.log('marker', marker);
    const feature = {
      key: marker._id,
      type: "Feature",
      properties: {
        id: marker._id,
        name: marker.name,
        street: marker.street,
        houseNumber: marker.houseNumber,
        zipCode: marker.zipCode,
        openingTime: marker.openingTime,
        closingTime: marker.closingTime,
      },
      geometry: { type: "Point", coordinates: marker.lngLat },
    };

    return feature;
  });

  return { features, type: "FeatureCollection" };
};
