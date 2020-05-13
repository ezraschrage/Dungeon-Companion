import { connect } from 'react-redux';
import { createCharacter } from '../../actions/character_actions';
import CharacterCreateForm from './character_create';

const msp = (state, ownProps) => ({
    character:  {
        name: "",
        race: "Dragonborn",
        klass: "Barbarian",
        armorClass: 10,
        str: 8,
        dex: 8,
        con: 8,
        int: 8,
        wis: 8,
        cha: 8,
        lvl: 1,
        allowMagic: false,
        proficiencies: [],
    },
    formType: 'Create', 
    errors: state.errors.entities,
})


const mapDispatchToProps = dispatch => {
    return {
        createCharacter: data => dispatch(createCharacter(data))
    };
};

export default connect(msp, mapDispatchToProps)(CharacterCreateForm);
