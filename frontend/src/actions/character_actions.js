import * as APIUtil from '../util/character_api_util';

export const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";
export const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS";
export const RECEIVE_ENTITIES_ERRORS = "RECEIVE_ENTITIES_ERRORS";

export const receiveCharacter = character => ({
    type: RECEIVE_CHARACTER,
    character
})

export const receiveCharacters = characters => ({
    type: RECEIVE_CHARACTER,
    characters
})

export const receiveErrors = errors => ({
    type: RECEIVE_ENTITIES_ERRORS,
    errors
});

export const createCharacter = data => dispatch => (
    APIUtil.createCharacter(data)
        .then(char => dispatch(receiveCharacter(char)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const getCharacter = charId => dispatch => (
    APIUtil.getCharacter(charId)
        .then(char => dispatch(receiveCharacter(char)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const getCharacters = () => dispatch => (
    APIUtil.getCharacters()
        .then(chars => dispatch(receiveCharacters(chars)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);
