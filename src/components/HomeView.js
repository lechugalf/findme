import React from 'react'
import '../styles/_HomeView.scss';

import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

function HomeView ({pets}) {
    return (
        <div className="HomeView">
            <PetPigeonMap pets={pets} />
            <PetCardList pets={pets} />
        </div>
    );
}

export default HomeView;