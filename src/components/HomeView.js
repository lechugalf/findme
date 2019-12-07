import React from 'react'
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

import '../styles/_HomeView.scss';

function HomeView() {

	useFirebaseConnect([
		{ path: 'pets' }
	]);

	const pets = useSelector(state => state.firebase.data['pets']) || [];

	// Show message while pets are loading
	if (!isLoaded(pets)) {
		return <div>Loading...</div>
	}

	// Show message if there are no pets
	if (isEmpty(pets)) {
		return <div>pets List Is Empty</div>
	}

	return (
		<div className="HomeView">
			<div className="map">
				<PetPigeonMap pets={pets} />
			</div>
			<PetCardList pets={pets} />
		</div>
	);
}

export default HomeView;