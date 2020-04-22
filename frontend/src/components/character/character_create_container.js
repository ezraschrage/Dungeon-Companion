import { connect } from 'react-redux';
import { createCharacter } from '../../actions/character_actions';
import CharacterCreateForm from './character_create';


const mapDispatchToProps = dispatch => {
    return {
        createCharacter: data => dispatch(createCharacter(data))
    };
};

export default connect(null, mapDispatchToProps)(CharacterCreateForm);