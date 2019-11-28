import React from 'react'
import { useParams } from 'react-router-dom';
import '../styles/_PetView.scss';

import ImageSlider from './ImageSlider';

function PetView({ pets }) {
    let { id } = useParams();
    let pet = pets[id] || {};
    return (
        <div className="PetView">
            <ImageSlider images={pet.photos || []} />
            <div className="group">
                <div className="name">
                    <i className="material-icons">pets</i>
                    <h1>{pet.name}</h1>
                </div>
                <button>{pet.status === 'lost' ? 'Desaparecido' : 'Encontrado'}</button>
            </div>
            <div className="group">
                <div className="labelContent">
                    <h2>Raza</h2>
                    <p>{pet.breed}</p>
                </div>
                <div className="buttonsGroup">
                    <i className="material-icons">photos</i>
                    <i className="material-icons">map</i>
                </div>
            </div>
            <div className="group">
                <div className="labelContent">
                    <h2>Descripción</h2>
                    <p>{pet.description}</p>
                </div>
            </div>
            <div className="group">
                <div className="labelContent">
                    <h2>Color</h2>
                    <p>{pet.color}</p>
                </div>
                <div className="labelContent">
                    <h2>Fecha</h2>
                    <p>{pet.dateOfLost}</p>
                </div>
            </div>
            <div className="group">
                <div className="labelContent">
                    <h2>Recompensa</h2>
                    <p>{pet.reward}</p>
                </div>
            </div>
            <div className="buttons">
                <div className="textButton">
                    <i className="material-icons">delete</i>
                    <p>Eliminar</p>
                </div>
                <div className="textButton">
                    <i className="material-icons">edit</i>
                    <p>Editar</p>
                </div>
                <div className="textButton">
                    <i className="material-icons">done</i>
                    <p>Marcar como encontrado</p>
                </div>
            </div>
        </div>
    );
}

export default PetView;