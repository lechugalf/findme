import React from 'react';
import '../styles/_PetCardList.scss';

import PetCard from './PetCard';
import Loader from './Loader';

function PetCardList({ pets }) {

  return (
    <section className="PetCardList">
      {
        pets && 
        Object.entries(pets).map((pet, index) => <PetCard key={index} pet={pet[1]} id={pet[0]} />)
      }
    </section>
  );
}

export default PetCardList;

