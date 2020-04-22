import { combineReducers } from 'redux';
import charactersReducer from './character_reducer';
import gamesReducers from './games_reducer';
import rulesReducers from './rules_reducer';

const EntitiesReducer = combineReducers({
    characters: charactersReducer,
    games: gamesReducers,
    monsters: rulesReducers,
});

export default EntitiesReducer;
