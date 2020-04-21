import * as APIUtil from '../util/character_api_util';

export const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";

export const receiveCharacter = character => ({
    type: RECEIVE_CHARACTER,
    character
})

export const createCharacter = data => dispatch => (
    APIUtil.createCharacter(data)
        .then(char => dispatch(receiveCharacter(char)))
        .catch(err => console.log(err))
);