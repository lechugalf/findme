import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import * as actions from './../actions';
import moment from 'moment';
import swal from 'sweetalert';
import '../styles/_PetView.scss';

import ImageSlider from './ImageSlider';
import PetPigeonMap from './PetPigeonMap';

function PetView(props) {

  const { id } = useParams();
  const history = useHistory();
  const pets = useSelector(state => state.pets);
  const pet = pets[id] || [];
  const [slider, setSlider] = useState(true);

  function handleDeletePet() {
    swal({
      title: "¿Seguro de borrar esta mascota?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.delPet(id);
        history.push('/');
      }
    });
  }

  return (
    <div className="PetView">
      <div className="dynamicContainer">
        {
          slider ?
            <ImageSlider images={pet.photos || []} /> :
            <PetPigeonMap pets={[pet]} location={pet.location} active={true} />
        }
      </div>
      <div className="group header">
        <div className="name">
          <i className="material-icons">pets</i>
          <h1>{pet.name || 'Sin nombre'}</h1>
        </div>
        {pet.status && <button>{pet.status}</button>}
      </div>
      <div className="group">
        {
          pet.breed &&
          <div className="labelContent">
            <h2>Raza</h2>
            <p>{pet.breed || 'No definida'}</p>
          </div>
        }
        <div className="buttonsGroup">
          <i
            className={slider ? "material-icons active" : "material-icons"}
            onClick={() => setSlider(true)}
          >photo_library</i>
          <i
            className={slider ? "material-icons" : "material-icons active"}
            onClick={() => setSlider(false)}
          >near_me</i>
        </div>
      </div>
      {
        pet.description &&
        <div className="group">
          <div className="labelContent">
            <h2>Descripción</h2>
            <p>{pet.description}</p>
          </div>
        </div>
      }
      <div className="group">
        {
          pet.color &&
          <div className="labelContent">
            <h2>Color</h2>
            <p>{pet.color}</p>
          </div>
        }{
          pet.dateOfLost &&
          <div className="labelContent">
            <h2>Fecha</h2>
            <p className="blue">{moment(pet.dateOfLost).format('lll')}</p>
          </div>
        }
      </div>
      {
        pet.reward &&
        <div className="group">
          <div className="labelContent">
            <h2>Recompensa</h2>
            <p>{pet.reward}</p>
          </div>
        </div>
      }
      <div className="group buttons">
        <div className="textButton"
          onClick={handleDeletePet}
        >
          <i className="material-icons">delete</i>
          <p>Eliminar</p>
        </div>
        <div
          className="textButton"
          onClick={() => history.push(`/edit/${id}`)}
        >
          <i className="material-icons">edit</i>
          <p>Editar</p>
        </div>
        <div className="textButton">
          <i className="material-icons">done</i>
          <p>Encontrado</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ pets }) => {
  return {
    pets
  };
};

export default connect(mapStateToProps ,actions)(PetView);