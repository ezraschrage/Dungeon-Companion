import { RECEIVE_MONSTER, RECEIVE_MONSTERS} from '../actions/rules_actions'

const RulesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MONSTERS:
            const newState = {};
            action.monsters.forEach(monster => {
                newState[monster.name] = monster;
            });
            return  newState
        case RECEIVE_MONSTER:
            return Object.assign({}, state, { [action.monster.name]: action.monster })
        default:
            return state;
    }
};

export default RulesReducer;