import React from 'react';
import {Link} from 'react-router-dom'

class CharacterIndex extends React.Component{
    constructor(props){
        super(props);
        this.sendDelete = this.sendDelete.bind(this);
    }

    componentDidMount(){
        this.props.getCharacter(this.props.match.params.charId);
    }

    sendDelete(){
        this.props.deleteCharacter(this.props.character._id)
        .then(this.props.history.push('/profile/'))
    }

    render(){
        if (!this.props.character) return (<div>Loading</div>);
        const character = this.props.character;
        return (
            <div className='character-show-main'>
                    <h2>{character.name}</h2>
                <div className="character-show-left">
                    <div>
                        <p>Race: {character.race}</p>
                        <p>Level: {character.lvl}</p>
                        <p>Strength: {character.str}</p>
                        <p>Constitution: {character.con}</p>
                        <p>Intelligence: {character.int}</p>
                        <p>Armor Class: {character.armorClass}</p>
                    </div>
                    <div>
                        <p>Class: {character.klass}</p>
                        <p>Hit Points: {character.hitPoints}</p>
                        <p>Dexterity: {character.dex}</p>
                        <p>Charisma: {character.cha}</p>
                        <p>Wisdom: {character.wis}</p>
                        <ul>Proficiencies: {character.proficiencies.map(prof => (<li key={prof}>{prof}</li>))}</ul>
                    </div>

                </div>
                <div className="character-show-right">
                    <Link to={`/characters/edit/${this.props.character._id}`}>Edit Character</Link>
                    <button onClick={this.sendDelete}>Delete Character</button>
                </div>
            </div>
        )
    }
}
export default CharacterIndex;