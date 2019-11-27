import { petsRef, personsRef } from '../config/firebase';
import { FETCH_PETS, FETCH_PERSONS } from './types';

export const addPet = newPet => async dispatch => {
    petsRef.push(newPet);
}

export const delPet = petId => async dispatch => {
    petsRef.child(petId).remove();
}

export const fetchPets = () => async dispatch => {

    petsRef.on('value', snapshot => {
        dispatch({
            type: FETCH_PETS,
            payload: snapshot.val()
        })
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}

export const fetchPersons = () => async dispatch => {
    personsRef.on('value', snapshot => {
        dispatch({
            type: FETCH_PERSONS,
            payload: snapshot.val()
        })
    })
}