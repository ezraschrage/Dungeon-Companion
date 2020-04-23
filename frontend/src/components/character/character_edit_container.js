import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { updateCharacter, getCharacter } from '../../actions/character_actions';
import CharacterCreateForm from './character_create';

const msp = (state, ownProps) => ({
    character: state.entities.characters[ownProps.match.params.charId],
    formType: 'Edit', 
})

const mapDispatchToProps = dispatch => {
    return {
        getCharacter: (charId) => dispatch(getCharacter( charId)),
        updateCharacter: (data, charId) => dispatch(updateCharacter(data, charId)),
    };
};

export default withRouter(connect(msp, mapDispatchToProps)(CharacterCreateForm));