import React from 'react'
import { useSelector } from 'react-redux';
import '../styles/_HomeView.scss';

import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

function HomeView ({ onClickMap }) {
    
    const pets = useSelector(state => state.pets);

    return (
        <div className="HomeView">
            <div className="map">
                <PetPigeonMap pets={pets} onClickMap={onClickMap} />
            </div>
            <PetCardList pets={pets} />
        </div>
    );
}

export default HomeView;