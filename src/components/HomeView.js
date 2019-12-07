import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from './../actions';
import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

import '../styles/_HomeView.scss';

function HomeView (props) {
    
    const [ pets, setPets ] = useState([]);

    useEffect(() => {
        props.fetchPets();
    }, [])

    useEffect(() => {
        setPets(props.pets);
    }, [props.pets])

    return (
        <div className="HomeView">
            <div className="map">
                <PetPigeonMap pets={pets} />
            </div>
            <PetCardList pets={pets} />
        </div>
    );
}

const mapStateToProps = ({ pets }) => {
  return {
    pets
  };
};

export default connect(mapStateToProps, actions)(HomeView);