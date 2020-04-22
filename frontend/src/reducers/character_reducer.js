import { RECEIVE_CHARACTER } from '../actions/character_actions';

const CharacterReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type){
        case RECEIVE_CHARACTER:
            newState = Object.assign({}, state, action.character.data)
            return newState;
        default:
            return state;
    }
}

export default CharacterReducer;