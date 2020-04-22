import { connect } from 'react-redux';
import { getCharacter, getCharacters } from '../../actions/character_actions';
import {openModal} from '../../actions/modal_actions'
import CharacterIndex from './character_index';
import {withRouter} from 'react-router-dom'

const msp = (state,ownProps) =>({
    character: state.entities.characters[ownProps.match.params.charId],
    characters: Object.values(state.entities.characters),
});

const mdp = dispatch => {
    return {
        openModal: () => dispatch(openModal('characterShow')), 
        getCharacter: (charId) => dispatch(getCharacter(charId)),
        getCharacters: () => dispatch(getCharacters()),
    };
};

export default withRouter(connect(msp, mdp)(CharacterIndex));