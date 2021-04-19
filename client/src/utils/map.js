import * as MapBoxGL from "mapbox-gl";

export const getBounds = (points) => {
  const bounds = new MapBoxGL.LngLatBounds();
  points.forEach(({ lngLat }) => {
    bounds.extend(lngLat);
  });
  return bounds;
};

export const getGeoJson = (list) => {
  const features = [...list].map(({ lngLat }) => {
    const feature = {
      type: "Feature",
      properties: {},
      geometry: { type: "Point", coordinates: lngLat },
    };

    return feature;
  });

  return { features, type: "FeatureCollection" };
};
