import React from 'react'
import '../styles/_HomeView.scss';

import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

function HomeView ({pets, onClickMap}) {
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