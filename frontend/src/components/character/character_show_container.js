import { connect } from 'react-redux';
import { getCharacter,deleteCharacter } from '../../actions/character_actions';
import CharacterShow from './character_show';
import {withRouter} from 'react-router-dom'

const msp = (state,ownProps) =>({
    character: state.entities.characters[ownProps.match.params.charId],
});

const mdp = dispatch => {
    return {
        getCharacter: (charId) => dispatch(getCharacter(charId)),
        deleteCharacter: (charId) => dispatch(deleteCharacter(charId)),
    };
};

export default withRouter(connect(msp, mdp)(CharacterShow));