import React from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import '../styles/_PetCard.scss';
const logo = 'corgi.jpg';

function PetCard({ id, pet }) {

  let history = useHistory();

  return (
    <div className="PetCard" onClick={() => history.push('/pet/' + id)}>
      <figure>
        <img src={pet.photos[0] || logo} alt=""></img>
        <div className="filter"></div>
        {
          pet.photos.length &&
          <span>
            <i className="material-icons">collections</i>
            {pet.photos.length}
          </span>
        }
      </figure>
      <section>
        <header>
          <div>
            {
              pet.name &&
              <div className="petName">
                <i className="material-icons">pets</i>
                <h1>{pet.name}</h1>
              </div>
            }
            {pet.breed && <h2>{pet.breed}</h2>}
          </div>
          {pet.dateOfLost && <div className="petDate">{moment(pet.dateOfLost).fromNow()}</div>}
        </header>
        <article>
          {pet.description && <p>{pet.description}</p>}
        </article>
      </section>
    </div>
  )
}

export default PetCard;