import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { addPet } from '../actions';
import {Redirect} from 'react-router-dom';

import swal from 'sweetalert';
import '../styles/_PetForm.scss';

import PetPigeonMap from './PetPigeonMap';

function PetForm({ selectLoc, addPet, onClickMap }) {

  const [selectLocation, setSelectLocation] = useState(selectLoc);
  const [animal, setAnimal] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(0);

  //didUpdate
  useEffect(() => {
    setSelectLocation(selectLoc);
  }, [selectLoc])

  const handleSubmit = (e) => {
    //photo default
    console.log('submit')
    e.preventDefault();
    const dateOfLost = new Date().toISOString()
    const owner = 1;
    const photos = ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRBYweXz5G8qcebTIYuGZbYK3KAh8qmcl4CE_BsL3j_JBYXikE'];
    const location = {
      lat: selectLocation[0],
      lng: selectLocation[1]
    }
    const newPet = { dateOfLost, owner, animal, name, breed, color, description, reward, photos, location };
    addPet(newPet, (val, err) => {
      if (val) {
        setAnimal('');
        setName('');
        setBreed('');
        setColor('');
        setDescription('');
        setReward('');
        swal("¡Nueva Mascota!", "Nueva mascota agregada a la lista de busqueda", "success")
        .then(() => {
          window.location.href='/home';
        })
        
      } else {
        console.log(err)
      }
    });

  }

  return (
    <section className="PetForm">
      <div className="map">
        <PetPigeonMap pets={null} onClickMap={onClickMap} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="animalSelector">
          <span
            onClick={(e) => setAnimal('perro')}
            className={animal === 'perro' ? 'active' : ''}
          >
            <i className="material-icons">pets</i>
            <h1>Perro</h1>
          </span>
          <span
            onClick={(e) => setAnimal('gato')}
            className={animal === 'gato' ? 'active' : ''}
          >
            <i className="material-icons">pets</i>
            <h1>Gato</h1>
          </span>
          <span
            onClick={(e) => setAnimal('otro')}
            className={animal === 'otro' ? 'active' : ''}
          >
            <i className="material-icons">pets</i>
            <h1>Otro</h1>
          </span>
        </div>
        <p>Nombre</p>
        <input type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Raza</p>
        <select
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option defaultValue value=''>Selecciona</option>
          <option value='Chihuhua'>Chihuhua</option>
          <option value='Pastor Aleman'>Pastor Aleman</option>
          <option value='Schanuzer'>Schanuzer</option>
          <option value='Salchicha'>Salchicha</option>
          <option value='Golden retriever'>Golden retriever</option>
          <option value='Husky Alaska'>Husky Alaska</option>
        </select>
        <p>Color</p>
        <input type="text"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <p>Descripción</p>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Recompenza</p>
        <input type="number"
          name="reward"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <p>Donde se perdió</p>
        <input type="text"
          name="location"
          value={selectLocation}
          disabled
        />
        <input class="success" type="submit" value="Agregar" />
      </form>
    </section>
  );
}

export default connect(null, { addPet })(PetForm);