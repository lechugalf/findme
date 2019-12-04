import React, { useState } from 'react';
import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';
import '../styles/_PetPigeonMap.scss';

function PetPigeonMap({ pets, onClickMap, location, active }) {

  const [currentLocation, setLocation] = useState(location || {
    lat: 19.246,
    lng: -103.726,
  });
  const [petSelected, setPetSelected] = useState(-1);

  let markers
  if (pets === null || Object.entries(pets).length === 0 && pets.constructor === Object) { 
    markers = null;

  } else {
    markers = Object.values(pets).map((pet, index) => {
      return (
        <Overlay
          className={index === petSelected || active ? 'marker active' : 'marker'}
          key={index}
          anchor={[pet.location.lat, pet.location.lng]}
          offset={[0, 0]}
        >
          <img
            alt='marker'
            src={pet.photos[0]}
            onClick={(e) => {
              setPetSelected(index);
              setLocation({
                lat: pet.location.lat,
                lng: pet.location.lng,
              })
            }}
            location={pet.location}
          />
        </Overlay>
      );
    })
  }

  return (
      <Map className="PetPigeonMap"
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={14}
        onClick={onClickMap}
      >{ markers }
      </Map>
  );
}

export default PetPigeonMap;