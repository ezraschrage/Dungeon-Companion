import { combineReducers } from 'redux';
import characterReducer from './character_reducer';

const EntitiesReducer = combineReducers({
    character: characterReducer
});

export default EntitiesReducer;
