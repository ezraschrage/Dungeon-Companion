import { RECEIVE_CHARACTER,RECEIVE_CHARACTERS, REMOVE_CHARACTER } from '../actions/character_actions';

const CharacterReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type){
        case RECEIVE_CHARACTER:
            newState = Object.assign({}, state, {[action.character.data.id]: action.character.data} )
            return newState;
        case RECEIVE_CHARACTERS:
            newState = Object.assign({}, state); 
            action.characters.data.forEach(element => {
                newState[element.id] = element;
            });
            return newState;
        case REMOVE_CHARACTER:
            newState = Object.assign({}, state);
            delete newState[action.charId];
            return newState
        default:
            return state;
    }
}

export default CharacterReducer;