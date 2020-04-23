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
        .then(this.props.history.push('/characters/'))
    }

    render(){
        if (!this.props.character) return (<div>Loading</div>);
        const character = this.props.character;
        return (
            <div className='character-show-main'>
                Character Stats:
                <h1>Name: {character.name}</h1>
                <h1>Race: {character.race}</h1>
                <h1>Class: {character.klass}</h1>
                <h1>Hit Points: {character.hitPoints}</h1>
                <h1>Strength: {character.str}</h1>
                <h1>Dexterity: {character.dex}</h1>
                <h1>Constitution: {character.con}</h1>
                <h1>Intelligence: {character.int}</h1>
                <h1>Wisdom: {character.wis}</h1>
                <h1>Charisma: {character.cha}</h1>
                <h1>Level: {character.lvl}</h1>
                <h1>Allow Magic: {character.allowMagic}</h1>
                <h1>Proficiencies: {character.proficiencies.map(prof => (<p>{prof}</p>))}</h1>
                <Link to={`/characters/edit/${this.props.character._id}`}>Edit Character</Link>
                <button onClick={this.sendDelete}>Delete Character</button>
            </div>
        )
    }
}
export default CharacterIndex;