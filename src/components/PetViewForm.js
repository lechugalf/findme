import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useFirebase, useFirebaseConnect, isLoaded } from 'react-redux-firebase';

import swal from 'sweetalert';
import '../styles/_PetViewForm.scss';

import dataForm from './PetDataForm';
import dataValidation from './petDataValidation';
import PetPigeonMap from './PetPigeonMap';

function PetViewForm(props) {

  const firebase = useFirebase()
  const history = useHistory();
  const { petId } = useParams()
  //useFirebaseConnect([{ path: 'pets' }]);
  //const pets = useSelector(state => state.firebase.data['pets']);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleDeletePhoto,
    handleChangeLocation
  } = dataForm(submit, dataValidation, { status: 'Perdido' }, petId || null, null);

  const photoPlaceholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYNKK6YMqs1WsqJtg7TJ3wlrDT9t1Tb8DILe3D72KZbpYtUBjz';
  const locationMarker = 'https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png';
  const buttonLabel = 'Añadir';


  function uploadPhotos(photos, petId) {
    let fileNames = []
    photos.forEach((urlPhoto, index) => {
      let fileName = `img${petId}-${index.toString()}`;
      fetch(urlPhoto)
        .then(r => r.blob())
        .then(blobFile => {
          new File([blobFile], fileName);
          firebase.uploadFile('/photos', blobFile, `/photos`, { name: fileName })
            .then(snap => {
              fileNames.push(snap.downloadURL);
              firebase.ref(`/pets/${petId}/photos/`).update(fileNames);
            })
            .catch(err => console.error('error uploading file', err))
        });
    });
  }


  function submit() {

    // clean empty photos
    let photosCleaned = [];
    values.photos.forEach(photo => {
      if (photo.length > 0)
        photosCleaned.push(photo);
    });
    values.photos = photosCleaned;
    values.owner = 1;

    //add pet
    if (props.action === 'add') {
      firebase.push('pets', values)
        .then((val) => {
          uploadPhotos(values.photos, val.key);
          swal("¡Nueva Mascota!", "Nueva mascota agregada a la lista de busqueda", "success")
            .then(() => history.push('/'));
        })
        .catch((err) => {
          console.log(err);
          swal("Hubo problema", "Error al crear tu mascota, intentalo mas tarde", "error");
        });
    }

    if (props.action === 'edit') {

      let id = petId;
      let updatedPet = { [id]: values }

      firebase.set('pets', updatedPet)
        .then((val) => {
          uploadPhotos(values.photos, val.key);
          swal("¡Guardado!", "cambios guardados con éxito", "success")
            .then(() => history.push('/'));
        })
        .catch((err) => {
          console.error(err);
          swal("Hubo problema", "Error al modificar tu mascota, intentalo mas tarde", "error");
        });
    }
  }

  return (
    <form className="PetViewForm" onSubmit={handleSubmit}>

      {/* ANIMAL SELECTOR */}
      <div className={`animalSelector ${errors.breed && 'error'}`}>
        <div
          className={`animal ${values.animal === 'dog' ? 'active' : ''}`}
          onClick={() => handleChange({ target: { name: 'animal', value: 'dog' } })}
        >
          <i className="material-icons">pets</i>
          <h1>Perro</h1>
        </div>
        <div
          className={`animal ${values.animal === 'cat' ? 'active' : ''}`}
          onClick={() => handleChange({ target: { name: 'animal', value: 'cat' } })}
        >
          <i className="material-icons">pets</i>
          <h1>Gato</h1>
        </div>
      </div>

      {/* NAME INPUT */}
      <p>Nombre</p>
      <input
        className={`${errors.name && 'error'}`}
        type="text"
        name="name"
        value={values.name || ''}
        onChange={handleChange}
      />

      {/* BREED INPUT */}
      <p>Raza</p>
      <select
        className={`${errors.breed && 'error'}`}
        name="breed"
        value={values.breed || ''}
        onChange={handleChange}
      >
        <option value='Chihuhua'>Chihuhua</option>
        <option value='Pastor Aleman'>Pastor Aleman</option>
        <option value='Schanuzer'>Schanuzer</option>
        <option value='Salchicha'>Salchicha</option>
        <option value='Golden retriever'>Golden retriever</option>
        <option value='Husky Alaska'>Husky Alaska</option>
      </select>

      {/* COLOR INPUT */}
      <p>Color</p>
      <input
        className={`${errors.color && 'error'}`}
        type="text"
        name="color"
        value={values.color || ''}
        onChange={handleChange}
      />

      {/* DESCRIPTION INPUT */}
      <p>Descripción</p>
      <textarea
        name="description"
        value={values.description || ''}
        onChange={handleChange}
      />

      {/* REWARD INPUT */}
      <p>Recompenza</p>
      <input type="number"
        name="reward"
        value={values.reward || ''}
        onChange={handleChange}
      />

      {/* PHOTOS INPUT */}
      <p>Fotos</p>
      <div className="photosSelector">
        {}
        <div className="photo">
          <i className="material-icons" onClick={() => handleDeletePhoto(0)}>close</i>
          <label htmlFor="photoInput0">
            <img src={values.photos && values.photos[0] ? values.photos[0] : photoPlaceholder} />
          </label>
          <input id="photoInput0" type="file" onChange={(e) => { e.photoId = 0; handleChange(e) }} />
        </div>
        <div className="photo">
          <i className="material-icons" onClick={() => handleDeletePhoto(1)}>close</i>
          <label htmlFor="photoInput1">
            <img src={values.photos && values.photos[1] ? values.photos[1] : photoPlaceholder} />
          </label>
          <input id="photoInput1" type="file" onChange={(e) => { e.photoId = 1; handleChange(e) }} />
        </div>
        <div className="photo">
          <i className="material-icons" onClick={() => handleDeletePhoto(2)}>close</i>
          <label htmlFor="photoInput2">
            <img src={values.photos && values.photos[2] ? values.photos[2] : photoPlaceholder} />
          </label>
          <input id="photoInput2" type="file" onChange={(e) => { e.photoId = 2; handleChange(e) }} />
        </div>
        <div className="photo">
          <i className="material-icons" onClick={() => handleDeletePhoto(3)}>close</i>
          <label htmlFor="photoInput3">
            <img src={values.photos && values.photos[3] ? values.photos[3] : photoPlaceholder} />
          </label>
          <input id="photoInput3" type="file" onChange={(e) => { e.photoId = 3; handleChange(e) }} />
        </div>
      </div>

      {/* LOCATION SELECTOR */}
      <p>¿Dónde se perdio?</p>
      <div className="locationSelector map">
        <PetPigeonMap
          pets={
            values.location
              ? { 'marker': { location: values.location, photos: [locationMarker] } }
              : {}
          }
          location={values.location || { lat: 19.246, lng: -103.726 }}
          onClickMap={handleChangeLocation} />
      </div>

      {/* DATETIME INPUT */}
      <p>Última vez que se vio</p>
      <input type="datetime-local"
        name="dateOfLost"
        value={values.dateOfLost || ''}
        onChange={handleChange}
      />

      {/* SENT FORM INPUT */}
      <input className="success" value={buttonLabel} type="submit" />

    </form>
  );
}

export default PetViewForm;

// Based on this tutorial
// https://github.com/upmostly/custom-react-hooks-form-validation