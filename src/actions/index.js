import { petsRef, personsRef } from '../config/firebase';
import { FETCH_PETS, FETCH_PERSONS } from './types';

export const addPet = (newPet, callback) => async dispatch => {
    petsRef.push(newPet)
        .then((val) => callback(val, null))
        .catch((err) => callback(null, err));
}

export const editPet = (updatedPet, callback) => async dispatch => {
    petsRef.update(updatedPet)
        .then((val) => callback(val, null))
        .catch((err) => callback(null, err));
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