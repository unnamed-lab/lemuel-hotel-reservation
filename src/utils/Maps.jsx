import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const container = {
  width: "100%",
  height: "100%",
};

const mapCoordinates = {
  lat: -3.745,
  lng: -38.523,
};

function MapComponent(coordinates = mapCoordinates, mapContainer = container) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "MY_GOOGLE_API_KEY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coordinates);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainer}
      center={coordinates}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;
