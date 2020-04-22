import * as APIUtil from '../util/rules_api_util';

export const RECEIVE_MONSTERS = "RECEIVE_MONSTERS";
export const RECEIVE_MONSTER = "RECEIVE_MONSTER"

export const receiveMonsters = monsters => ({
    type: RECEIVE_MONSTERS,
    monsters
})

export const receiveMonster = monster => ({
    type: RECEIVE_MONSTER,
    monster
})

export const fetchMonsters = () => dispatch => (
    APIUtil.getMonsters().then(monsters => (
        dispatch(receiveMonsters(monsters.data))
    ))
);

export const fetchMonster = monster => dispatch => (
    APIUtil.getMonster(monster).then(monster => (
        dispatch(receiveMonster(monster.data))
    ))
);

export const searchMonsters = monster => dispatch => (
    APIUtil.searchMonster(monster).then(monster => (
        dispatch(receiveMonsters(monster.data.results))
    ))
);