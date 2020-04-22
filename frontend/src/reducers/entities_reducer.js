import { combineReducers } from 'redux';
import characterReducer from './character_reducer';
import gamesReducers from './games_reducer';

const EntitiesReducer = combineReducers({
    character: characterReducer,
    games: gamesReducers,
});

export default EntitiesReducer;
