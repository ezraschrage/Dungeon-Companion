import { RECEIVE_GAME,RECEIVE_GAMES, REMOVE_GAME } from '../actions/game_actions';

const GamesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch(action.type){
        case RECEIVE_GAME:
            newState = Object.assign({}, state, {[action.game._id]: action.game} )
            return newState;
        case RECEIVE_GAMES:
            newState = Object.assign({}, state); 
            action.games.forEach(element => {
                newState[element._id] = element;
            });
            return newState;
        case REMOVE_GAME:
            newState = Object.assign({}, state);
            delete newState[action.gameId];
            return newState
        default:
            return state;
    }
}


export default GamesReducer;