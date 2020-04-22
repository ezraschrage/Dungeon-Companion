import { RECEIVE_ENTITIES_ERRORS, RECEIVE_CHARACTER, RECEIVE_CHARACTERS } from '../actions/character_actions';

const _nullErrors = [];

const EntitiesErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ENTITIES_ERRORS:
            return action.errors;
        case RECEIVE_CHARACTER:
        case RECEIVE_CHARACTERS:
            return _nullErrors;
        default:
            return state;
    }
};

export default EntitiesErrorsReducer;