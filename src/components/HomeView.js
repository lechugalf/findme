import React from 'react'
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PetCardList from './PetCardList';
import PetPigeonMap from './PetPigeonMap';

import '../styles/_HomeView.scss';
import Loader from './Loader';

function HomeView() {

	useFirebaseConnect([
		{ path: 'pets' }
	]);

	const pets = useSelector(state => state.firebase.data['pets']) || [];

	// Show message while pets are loading
	if (!isLoaded(pets)) {
		return <Loader/>;
	}

	// Show message if there are no pets


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