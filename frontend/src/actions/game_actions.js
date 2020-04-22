import * as APIUtil from '../util/character_api_util';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const REMOVE_GAME = "REMOVE_GAME";
export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_ENTITIES_ERRORS = "RECEIVE_ENTITIES_ERRORS";

export const receiveGame = character => ({
    type: RECEIVE_GAME,
    character
});

export const receiveCharacters = characters => ({
    type: RECEIVE_CHARACTER,
    characters
});

export const removeCharacters = charId => ({
    type: REMOVE_CHARACTER,
    charId
});

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

export const searchCharacters = (name) => dispatch => (
    APIUtil.searchCharacters(name)
        .then(chars => dispatch(receiveCharacters(chars)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const updateCharacter = (character, charId) => dispatch => (
    APIUtil.updateCharacter(character, charId)
        .then(char => dispatch(receiveCharacter(char)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const deleteCharacters = (charId) => dispatch => (
    APIUtil.deleteCharacter(charId)
        .then(charId => dispatch(removeCharacters(charId)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

