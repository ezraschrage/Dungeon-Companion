import React from 'react';
import {Link} from 'react-router-dom';
import MonsterShow from './game_monster_show';
import CharacterShow from './game_character_show';

class GameShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            monsterInfo: null,
            characterInfo: null,
        }
        this.showMonster = this.showMonster.bind(this);
        this.showCharacter = this.showCharacter.bind(this);
        
    }
    componentDidMount(){
        this.props.getGame(this.props.match.params.gameId);
    }

    showMonster(monster){
        return (e) => {
            if(!this.props.monsters[monster.name]){
                this.props.fetchMonster(monster.index)
                .then((newMonst) => this.setState({monsterInfo: newMonst.monster }))
            }else{
                this.setState({monsterInfo: this.props.monsters[monster.name]})
            }
        }
    }

    showCharacter(character){
        return (e) => {
            if(!this.props.characters[character.id]){
                this.props.getCharacter(character.id)
                .then(({character}) => this.setState({characterInfo: character }))
                .catch(() => this.setState({characterInfo: 'Error'}));
            }
            else{
                this.setState({characterInfo: this.props.characters[character.id]})
            }
        }
    }

    render(){
        if(!this.props.game) return (<div>loading</div>)
        const monsterInfo = this.state.monsterInfo ? < MonsterShow monster={this.state.monsterInfo} /> : null;
        const characterInfo = this.state.characterInfo ? this.state.characterInfo === 'Error' ? <p>CHARACTER NOT FOUND</p> : <CharacterShow character={this.state.characterInfo} /> : null; 
        return (<div>
            <Link to='/games'>GAMES INDEX</Link>
            <h1>GAME Show</h1>
            <h1>{this.props.game.title}</h1>
            <ul>
                <h1>players</h1>
                {this.props.game.players.map(player => (<li key={player._id} onClick={this.showCharacter(player)}>{player.name}</li>))}
            </ul>
            <ul>
                <h1>monsters</h1>
                {this.props.game.monsters.map( (monster,idx)  => (<li key={`${monster.name} ${idx}`} onClick={this.showMonster(monster)} >{monster.name}</li>))}
            </ul>
            {monsterInfo}
            {characterInfo}
        </div>)
    }
}

export default GameShow;