import { RECEIVE_MONSTER, RECEIVE_MONSTERS} from '../actions/rules_actions'

const RulesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MONSTERS:
            return Object.assign({}, state, action.monsters)
        case RECEIVE_MONSTER:
            return Object.assign({}, state, { [action.monster.id]: action.monster })
        default:
            return state;
    }
};

export default RulesReducer;