import React from 'react';
import '../styles/_PetCardList.scss';

import PetCard from './PetCard';

function PetCardList({ pets }) {

  let cards
  if (Object.entries(pets).length === 0 && pets.constructor === Object) {
    cards='loading'
  } else {
    cards = Object.entries(pets).map((pet, index) =>
      <PetCard
        key={index}
        pet={pet[1]}
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

