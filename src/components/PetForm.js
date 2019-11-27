import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addPet } from '../actions';
import '../styles/_PetForm.scss';

function PetForm({ selectLoc, addPet }) {

  const [ animal, setAnimal ] = useState('');
  const [ name, setName ] = useState('');
  const [ breed, setBreed ] = useState('');
  const [ color, setColor ] = useState('');
  const [ description , setDescription  ] = useState('');
  const [ reward, setReward ] = useState(0);

  const handleSubmit = (e) => {
    //photo default
    console.log('submit')
    e.preventDefault();
    const dateOfLost = new Date().toISOString()
    const owner = 1;
    const photos = ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRBYweXz5G8qcebTIYuGZbYK3KAh8qmcl4CE_BsL3j_JBYXikE'];
    const newPet = { dateOfLost, owner, animal, name, breed, color, description, reward, selectLoc, photos }
    addPet(newPet);
    setAnimal('');
    setName('');
    setBreed('');
    setColor('');
    setDescription('');
    setReward('');
  }

  return (
    <section className="PetForm">
      <form onSubmit={handleSubmit}>
        <div className="animalSelector">
          <span
            onClick={(e) => setAnimal('perro')}
            className={animal === 'perro' ? 'active':''}
          >
            <i className="material-icons">pets</i>
            <h1>Perro</h1>
          </span>
          <span
            onClick={(e) => setAnimal('gato')}
            className={animal === 'gato' ? 'active':''}
          >
            <i className="material-icons">pets</i>
            <h1>Gato</h1>
          </span>
          <span
            onClick={(e) => setAnimal('otro')}
            className={animal === 'otro' ?  'active':''}
          >
            <i className="material-icons">pets</i>
            <h1>Otro</h1>
          </span>
        </div>
        <p>Nombre</p>
        <input type="text"
          name="name"
          value={ name }
          onChange={(e) => setName(e.target.value)}
        />
        <p>Raza</p>
        <select
          value={ breed }
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
          value={ color }
          onChange={(e) => setColor(e.target.value)}
        />
        <p>Descripción</p>
        <textarea
          name="description"
          value={ description }
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Recompenza</p>
        <input type="number"
          name="reward"
          value={ reward }
          onChange={(e) => setReward(e.target.value)}
        />
        <p>Donde se perdió</p>
        <input type="text"
          name="location"
          value={ [selectLoc.lat, selectLoc.lng] }
          disabled
        />
        <input class="success" type="submit" value="Agregar"/>
      </form>
    </section>
  );
}

export default connect(null, { addPet })(PetForm);