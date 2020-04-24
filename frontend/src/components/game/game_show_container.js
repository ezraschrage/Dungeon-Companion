import { connect } from 'react-redux';
import { getCharacter } from '../../actions/character_actions';
import {fetchMonster} from '../../actions/rules_actions';
import {getGame, playTurnGame} from '../../actions/game_actions';
import GameShow from './game_show';
import {withRouter} from 'react-router-dom';

const msp = (state,ownProps) =>({
    game: state.entities.games[ownProps.match.params.gameId],
    characters: state.entities.characters,
    monsters: state.entities.monsters,
});

const mdp = dispatch => {
    return {
        playTurnGame: (newGameState, gameId) => dispatch(playTurnGame(newGameState, gameId)),

        getCharacter: (charId) => dispatch(getCharacter(charId)),
        fetchMonster: (monster) => dispatch(fetchMonster(monster)),
        getGame: (gameId) => dispatch(getGame(gameId)),
    };
};

export default withRouter(connect(msp, mdp)(GameShow));