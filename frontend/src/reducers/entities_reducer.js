import { combineReducers } from 'redux';
import charactersReducer from './character_reducer';
import gamesReducers from './games_reducer';

const EntitiesReducer = combineReducers({
    characters: charactersReducer,
    games: gamesReducers,
});

export default EntitiesReducer;
