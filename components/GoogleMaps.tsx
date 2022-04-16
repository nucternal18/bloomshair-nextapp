import { useState, memo, FC, useRef, useCallback } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
  InfoBox,
} from "@react-google-maps/api";
import { BloomsLogo } from "./SVG/BloomsLogo";

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

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
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
            <p className="flex flex-col">
              <span className="p-1 mb-1 text-xl flex justify-center">
                <BloomsLogo width={150} height={80} fill="#000" />
              </span>
              <span className="mb-4 font-thin text-center">
                9 Lever Street, London. EC1V 3QU
              </span>
            </p>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Maps);
