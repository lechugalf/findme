import React from 'react';
import '../styles/_PetCardList.scss';

import PetCard from './PetCard';
import Loader from './Loader';

function PetCardList({ pets }) {

  let cards
  //if (Object.entries(pets).length === 0 && pets.constructor === Object) {
  if (pets === null || Object.entries(pets).length === 0 && pets.constructor === Object) {
    cards = <Loader />;
  } else {
    cards = Object.values(pets).map((pet, index) => 
      <PetCard
        key={index}
        pet={pet}
      />
    )
  }


  return (
    <section className="PetCardList">
      {
        cards
      }
    </section>
  );
}

export default PetCardList;

