import { connect } from 'react-redux';
import { getDMGames } from '../../actions/game_actions';
import GameIndex from './game_index';
import {withRouter} from 'react-router-dom'

const msp = (state) =>({
    games: Object.values(state.entities.games),
});

const mdp = dispatch => {
    return {
        getDMGames: (charId) => dispatch(getDMGames(charId)),
    };
};

export default withRouter(connect(msp, mdp)(GameIndex));