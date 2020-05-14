import { RECEIVE_CHARACTER,RECEIVE_CHARACTERS, REMOVE_CHARACTER } from '../actions/character_actions';
import {RECEIVE_USER_LOGOUT} from '../actions/session_actions';

const CharactersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type){
        case RECEIVE_CHARACTER:
            newState = Object.assign({}, state, {[action.character._id]: action.character} )
            return newState;
        case RECEIVE_CHARACTERS:
            newState = Object.assign({}, state); 
            action.characters.forEach(element => {
                newState[element._id] = element;
            });
            return newState;
        case REMOVE_CHARACTER:
            newState = Object.assign({}, state);
            delete newState[action.charId];
            return newState
        case RECEIVE_USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export default CharactersReducer;