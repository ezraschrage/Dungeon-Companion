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
            <div className='character-index-container'>
                <div className='character-index-main'>
                    <Link to='/profile'>Back to profile</Link>
                    <h1>Manage your Characters</h1>
                    <Link to='/characters/create'>Create a Character</Link>


                    <ul>
                    {this.props.characters.map(char => (
                            <li key={char._id} onClick={this.showChar(char._id)}>
                                <h2>Name: {char.name}</h2>
                                <h3>Race: {char.race}</h3>
                                <h3>Class: {char.klass}</h3>
                                <h3>Level: {char.lvl}</h3>
                                {/* <button onClick={this.showChar(char._id)}>More Info</button> */}
                            </li>
                    ))}

                    {charShow}
                    </ul>
                </div>
            </div>
        )
    }
}
export default CharacterIndex;