import { combineReducers } from 'redux';

import pets from './petReducer';
import persons from './personReducer';

export default combineReducers({
    pets,
    persons
});