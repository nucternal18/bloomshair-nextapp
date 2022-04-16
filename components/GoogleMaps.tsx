import { useState, memo, FC, useRef, useCallback } from "react";

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

interface MapProps {
  containerStyle: {
    height: string;
  };
  zoom: number;
}

const Maps: FC<MapProps> = ({ containerStyle, zoom }): JSX.Element => {
  const [selected, setSelected] = useState(false);
  const mapRef = useRef<any>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    const bounds = new google.maps.LatLngBounds();

    bounds.extend(new google.maps.LatLng(center.lat, center.lng));
    mapRef.current = mapInstance;
    mapInstance.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
    >
      <Marker
        position={{ lat: center.lat, lng: center.lng }}
        onClick={() => {
          setSelected(true);
        }}
      />
      {selected ? (
        <InfoWindow
          position={{ lat: center.lat, lng: center.lng }}
          onCloseClick={() => {
            setSelected(false);
          }}
        >
          <p>
            <span className="p-2 mb-2 text-xl font-bold text-white bg-black">
              Blooms Hair
            </span>
            <span className="mb-4 font-thin">
              9 Lever Street, London. EC1V 3QU
            </span>
          </p>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  ) : (
    <div>
      <Spinner message="loading maps" />
    </div>
  );
};

export default memo(Maps);
