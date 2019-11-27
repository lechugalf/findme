import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, OverlayView } from '@react-google-maps/api';
import '../styles/_PetMap.scss';

function PetGoogleMap({ pets, onClickPet }) {

  // Get current position
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentLocationError, setCurrentLocationError] = useState(null);
  const onChangeLocation = ({ coords }) => {
    setCurrentLocation({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }
  const onErrorLocation = (error) => {
    setCurrentLocationError(error.message);
  }
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setCurrentLocationError('Geolocation is not supported!');
      return;
    }
    let watcher = geo.watchPosition(onChangeLocation, onErrorLocation);
    return () => geo.clearWatch(watcher)
  }, []);

  //pet selected
  const [petSelected, setPetSelected] = useState(-1);

  //wrapper hook
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCFU69UzWp2F8AiOrUr54xP9IdC0SSKq90",
  })

  //Wrapper function for access to window.google
  const renderMap = () => {
    const onLoad = function onLoad(mapInstance) {
      }
    return <GoogleMap
      mapContainerClassName="googleMap"
      zoom={14}
      center={currentLocation}
      onLoad={onLoad}
    >{
        pets.map((pet, index) => (
          <OverlayView
            key={index}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={{
              lat: pet.location.lat,
              lng: pet.location.lng
            }}
          >
            <div
              className={index === petSelected ? 'marker active' : 'marker'}
              style={{ backgroundImage: `url(${pet.photos[0]})`}}
              onClick={(e) => {
                setPetSelected(index);
                setCurrentLocation(pet.location);
                onClickPet(index);
              }}
            />
          </OverlayView>
        ))
      }
    </GoogleMap>;
  }

  if (loadError)
    return <div>Map cannot be loaded right now, sorry.</div>;

  return isLoaded ? renderMap() : <div>Map cannot be loaded right now, sorry.</div>;
}


export default PetGoogleMap;

