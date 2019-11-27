import React from 'react';
import moment from 'moment';
import '../styles/_PetCard.scss';

function PetCard({ pet }) {
  return (
    <div className="PetCard">
      <figure>
        <img src={pet.photos[0]} alt=""></img>
        <div className="filter"></div>
        <span>
          <i className="material-icons">collections</i>
          {pet.photos.length}
        </span>
      </figure>
      <section>
        <header>
          <div>
            <div className="petName">
              <i className="material-icons">pets</i>
              <h1>{pet.name}</h1>
            </div>
            <h2>{pet.breed}
            </h2>
          </div>
          <div className="petDate">{moment(pet.dateOfLost).fromNow()}</div>
        </header>
        <article>
          <p>{pet.description}</p>
        </article>
      </section>
    </div>
  )
}

export default PetCard;