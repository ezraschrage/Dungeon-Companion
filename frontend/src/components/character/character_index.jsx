import React from 'react';
import {Link} from 'react-router-dom'
import CharacterShowContainer from './character_show_container';

class CharacterIndex extends React.Component{
    constructor(props){
        super(props);
        this.showChar = this.showChar.bind(this);
    }

    componentDidMount(){
        this.props.getCharacters();
    }

    showChar(id){
        return (e) => {
            this.props.openModal()
            this.props.history.push(`/characters/${id}`)
        }
    }


    render(){
        const charShow =  this.props.character ? <CharacterShowContainer /> : <h1>Click char to get one</h1>;
        return (
            <div className='character-index-main'>
                <Link to='/profile'>Back to profile</Link>
                Welcome to character index
                <Link to='/characters/create'>Create Character</Link>
                {charShow}
                <ul>
                {this.props.characters.map(char => (
                        <li key={char._id}>
                            <h1>Name: {char.name}</h1>
                            <h3>Race: {char.race}</h3>
                            <h3>Class: {char.klass}</h3>
                            <h2>Level: {char.lvl}</h2>
                            <button onClick={this.showChar(char._id)}>More Info</button>
                            </li>
                    ))}
                    </ul>
                
            </div>
        )
    }
}
export default CharacterIndex;