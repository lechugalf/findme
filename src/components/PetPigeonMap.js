import React, { useState } from 'react';
import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';
import '../styles/_PetPigeonMap.scss';

function PetPigeonMap({ pets, onClickPet, location }) {

  const [currentLocation, setLocation] = useState(location || {
    lat: 19.246,
    lng: -103.726,
  });

  const [petSelected, setPetSelected] = useState(-1);
  let markers = null;

  if (Array.isArray(pets)) {
    markers = pets.map((pet, index) => {
      return (
        <Overlay
          className={index === petSelected ? 'marker active' : 'marker'}
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
    <Map
      className="PetPigeonMap"
      center={[currentLocation.lat, currentLocation.lng]}
      zoom={14}
      height={700}
      onClick={onClickPet}
    >{ markers }
    </Map>
  );
}

export default PetPigeonMap;