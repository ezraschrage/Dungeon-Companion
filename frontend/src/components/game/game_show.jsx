import React from 'react';
import {Link} from 'react-router-dom';
import MonsterShow from './game_monster_show';
import CharacterShow from './game_character_show';

class GameShow extends React.Component{
    constructor(props){
        super(props);
        let order = []
        if(props.game){
            order = props.game.monsters.concat(props.game.players);
            order.sort((a,b) => Math.sign(b.initiative - a.initiative));
        }
        this.state = {
            monsterInfo: null,
            characterInfo: null,
            order: order,
        }
        this.showMonster = this.showMonster.bind(this);
        this.showCharacter = this.showCharacter.bind(this);
    }

    componentDidMount(){
        if(!this.props.game){
            this.props.getGame(this.props.match.params.gameId)
            .then(({game}) => {
                const order = game.monsters.concat(game.players);
                order.sort((a,b) => Math.sign(b.initiative - a.initiative));
                this.setState({order: order})
            });
        }
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
        return (
            <div className="show-main">
                <div className="show-info">
                    <div className="show-instructions">
                        <div className="show-game-name">{this.props.game.title}</div>
                        <ul className="instructions-list">
                            <li>Click the "next" button to advance the turn.</li>
                            <li>Click on a character or monster to see expanded info</li>
                            <li>Keep track of the HP with the input</li>
                            <li><Link to='/games'>Return to other games</Link></li>
                        </ul>
                    </div>
                    <div className="show-list">
                        <ul>
                            <div className="show-title">Players</div>
                            {this.props.game.players.map(player => (
                            <li key={player._id} onClick={this.showCharacter(player)}>
                                {player.name}
                            </li>))}
                            {characterInfo}
                        </ul>
                    </div>
                    <div className="show-list">
                        <ul>
                            <div className="show-title">Monsters</div>
                            {this.props.game.monsters.map( (monster,idx)  => (
                            <li key={`${monster.name} ${idx}`} onClick={this.showMonster(monster)} >
                                {monster.name}
                            </li>))}
                            {monsterInfo}
                        </ul>
                    </div>                
                </div>
                <div className="show-battle">
                    {this.state.order.map((item, idx) => (
                        <li key={`${item.initiative} ${idx}`}>
                            {item.name}
                        </li>))}
                </div>
        </div>)
    }
}

export default GameShow;