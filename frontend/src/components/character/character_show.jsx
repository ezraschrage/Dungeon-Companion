import React from 'react';
import {Link} from 'react-router-dom'

class CharacterIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getCharacter(this.props.match.params.charId);
    }

    render(){
        if (!this.props.character) return (<div>Loading</div>);
        const character = this.props.character;
        return (
            <div className='character-show-main'>
                <div className="character-show-left">
                    <h2>{character.name}</h2>
                    <p>Race: {character.race}</p>
                    <p>Class: {character.klass}</p>
                    <p>Hit Points: {character.hitPoints}</p>
                    <p>Armor Class: {character.armorClass}</p>
                    <p>Strength: {character.str}</p>
                    <p>Dexterity: {character.dex}</p>
                    <p>Constitution: {character.con}</p>
                    <p>Intelligence: {character.int}</p>
                    <p>Wisdom: {character.wis}</p>
                    <p>Charisma: {character.cha}</p>
                    <p>Level: {character.lvl}</p>
                    <p>Allow Magic: {character.allowMagic}</p>
                    <ul>Proficiencies: {character.proficiencies.map(prof => (<li key={prof}>{prof}</li>))}</ul>
                </div>
                <div className="character-show-right">
                    <Link to={`/characters/edit/${this.props.character.id}`}>Edit Character</Link>
                </div>
            </div>
        )
    }
}
export default CharacterIndex;