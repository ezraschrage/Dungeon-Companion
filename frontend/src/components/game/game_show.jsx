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
        this.sweepDeadMonsters = this.sweepDeadMonsters.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.playTurn = this.playTurn.bind(this);
    }

    componentDidMount(){
        if(!this.props.game){
            this.props.getGame(this.props.match.params.gameId)
            .then(({game}) => {
                this.setState({order: this.setOrder(game)})
            });
        }
    }

    setOrder(game){
        const order = game.monsters.concat(game.players);
        return order.sort((a,b) => Math.sign(b.initiative - a.initiative));
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

    adjustHpCreature(idx){
        return (e) => {
            let oldState = {...this.state}
            let newHp = this.state.order[idx].hp - e.currentTarget.value;
            oldState.order[idx].hp = newHp
            this.setState(oldState);
            e.currentTarget.value = 0;
        }
    }

    sweepDeadMonsters(arrOfCreatures){
        // Run before sending the new game state...
        let monsters = [];
        const characters = []; 
        arrOfCreatures.forEach( creature => creature.index ? monsters.push(creature) : characters.push(creature) )
        monsters = monsters.filter(monst => monst.hp > 0);
        return {
            players: characters,
            monsters: monsters,
            title: this.props.game.title,
        };
    }

    playTurn(){
        this.props.playTurnGame(this.sweepDeadMonsters(this.state.order), this.props.game._id)
        .then(({game}) => this.setState({order: this.setOrder(game)}))
    }

    render(){
        const hpAdjustValues = [];
        for (let i = 100; i >= -100; i--){
            hpAdjustValues.push(i);
        }
        const characterInfo = this.state.characterInfo ? this.state.characterInfo === 'Error' ? <p>CHARACTER NOT FOUND</p> : <CharacterShow character={this.state.characterInfo} /> : null;
        const currentTurnCreature = this.state.order.length > 0 ? <h2>{this.state.order[0].name}</h2> : <></>
        const remainingTurnCreatures = this.state.order.length > 0 ? <>{this.state.order.slice(1).map(creature => <h3>{creature.name}</h3>)}</> : <></>

        if(!this.props.game) return (<div>loading</div>)
        const monsterInfo = this.state.monsterInfo ? < MonsterShow monster={this.state.monsterInfo} /> : null;
        return (
            <div className="show-main">
                <div className="show-info">
                    <div className="show-instructions">
                        <div className="show-game-name">{this.props.game.title}</div>
                        <ul className="instructions-list">
                            <li>Click the "Next Turn" button to advance the turn.</li>
                            <li>Click on a character or monster to see expanded info</li>
                            <li>Keep track of the HP with the input</li>
                            <li><Link to='/games'>Return to other games</Link></li>
                        </ul>
                    </div>
                    <div className="show-list">
                        <div className="show-list-box">
                            <ul>
                                <div className="show-title">Players</div>
                                {this.props.game.players.map(player => (
                                <li key={player._id} className="show-combatant-name" onClick={this.showCharacter(player)}>
                                    {player.name}
                                </li>))}
                            </ul>
                        </div>
                        <div className="show-info-box">
                            <div>
                            {characterInfo}
                            </div>
                        </div>
                    </div>
                    <div className="show-list">
                        <div className="show-list-box">
                            <ul>
                                <div className="show-title">Monsters</div>
                                {this.props.game.monsters.map( (monster,idx)  => (
                                    <li key={`${monster.name} ${idx}`} className="show-combatant-name" onClick={this.showMonster(monster)}>
                                    {monster.name}
                                </li>))}
                            </ul>
                        </div>
                        <div className="show-info-box">
                            <div>
                            {monsterInfo}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="show-battle">
                    <div className="show-turn" >CURRENT TURN:</div>
                    <div className="show-turn">{currentTurnCreature}</div>
                    {/* <h2>REMAINING CREATURES:</h2>
                    {remainingTurnCreatures} */}

                    <button
                        onClick={this.playTurn}>
                      Next Turn
                     </button>
                    <div className="show-battle-headers">
                        <div className="show-battle-header">
                            Combatant
                        </div>
                        <div className="show-battle-header">
                            HP
                        </div>
                        <div className="show-battle-header">
                            Other
                        </div>
                    </div>
                    <div className="show-battle-creatures">
                    <ul className="show-battle-unordered">
                    {this.state.order.map((item, idx) => (
                        <li key={`${item.initiative} ${idx}`} className="show-battle-creature">
                            <div className="show-battle-name">
                                {item.name}
                            </div>
                            <div className="show-battle-hp">
                                {item.hp}                     <select name="hp" onChange={this.adjustHpCreature(idx)}>
                                    <option value="0" selected disabled hidden>---</option>
                                    {hpAdjustValues.map(changeValue => (
                                        <option key={changeValue} value={changeValue}> {changeValue}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="show-battle-other">
                                {item.name}
                            </div>
                        </li>))}
                    </ul>
                    </div>
                </div>
        </div>)
    }
}

export default GameShow;