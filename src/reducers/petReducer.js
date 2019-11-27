import { FETCH_PETS } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PETS:
            return action.payload;
        default:
            return state;
    }
}