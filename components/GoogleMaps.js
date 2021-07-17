import { useState, memo } from 'react';

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const center = {
  lat: 51.526528,
  lng: -0.099461,
};

const Maps = ({ containerStyle, zoom }) => {
  const [selected, setSelected] = useState(false);

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   const latLng = new window.google.maps.LatLng(51.526553, -0.099464);
  //   console.log(bounds)
  //   bounds.extend(latLng);
  //   map.setCenter(bounds.getCenter())
  //   map.fitBounds(bounds);
  // }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
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
            }}>
            <div>
              <h1 className='p-2 mb-2 text-xl font-bold text-white bg-black'>
                Blooms Hair
              </h1>
              <p className='mb-4 font-thin'>9 Lever Street, London. EC1V 3QU</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Maps);
