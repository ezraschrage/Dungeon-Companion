import { connect } from 'react-redux';
import { getDMGames, deleteGame } from '../../actions/game_actions';
import GameIndex from './game_index';
import {withRouter} from 'react-router-dom'

const msp = (state) =>({
    games: Object.values(state.entities.games),
});

const mdp = dispatch => {
    return {
        getDMGames: (charId) => dispatch(getDMGames(charId)),
        deleteGame:  (game_id) => dispatch(deleteGame(game_id))
    };
};

export default withRouter(connect(msp, mdp)(GameIndex));