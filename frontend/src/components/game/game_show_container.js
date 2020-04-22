import { connect } from 'react-redux';
import { getCharacter } from '../../actions/character_actions';
import GameShow from './game_show';
import {withRouter} from 'react-router-dom'

const msp = (state,ownProps) =>({
    character: state.entities.characters[ownProps.match.params.charId],
});

const mdp = dispatch => {
    return {
        getCharacter: (charId) => dispatch(getCharacter(charId))
    };
};

export default withRouter(connect(msp, mdp)(GameShow));