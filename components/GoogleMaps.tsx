import { useState, memo, useCallback } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import Spinner from "./Spinner";

const center = {
  lat: 51.526528,
  lng: -0.099461,
};

const Maps = ({ containerStyle, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [selected, setSelected] = useState(false);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: 51.526528, lng: -0.099461 }}
        onClick={() => {
          setSelected(true);
        }}
      />
      {selected && (
        <InfoWindow
          position={{ lat: 51.526528, lng: -0.099461 }}
          onCloseClick={() => {
            setSelected(false);
          }}
        >
          <div>
            <h1 className="p-2 mb-2 text-xl font-bold text-white bg-black">
              Blooms Hair
            </h1>
            <p className="mb-4 font-thin">9 Lever Street, London. EC1V 3QU</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center">
      <Spinner message="loading map..." />
    </div>
  );
};

export default memo(Maps);
