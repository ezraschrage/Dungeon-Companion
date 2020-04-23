import React from 'react';

class GameCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            players: {},
            monsters: [],
            monstCount: 0,
            playersCount: 0,
            searchMonstWord: '',
            searchPlayerWord: '',
            monsterInfo: null,
            characterInfo: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMonsters = this.getMonsters.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.addCharacter = this.addCharacter.bind(this);
        this.showMonster = this.showMonster.bind(this);
        this.showCharacter = this.showCharacter.bind(this);
        this.timer = null;
    }
    
    componentDidMount(){
        this.props.getCharacters();
    }

    handleSubmit(e){
        e.preventDefault();
        const newGame = {
            title: this.state.title,
            players: Object.values(this.state.players),
            monsters: this.state.monsters,
        }
        debugger
        this.props.createGame(newGame)
        .then((data) => this.props.history.push(`/games/${data.game._id}`) )
    }

    handleInput(type){
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    getMonsters(e){
        this.setState({searchMonstWord: e.target.value});
        clearTimeout(this.timer);
        const search = this.props.searchMonsters;
        const name = e.target.value;
        this.timer = setTimeout( () => {if(name !== '') search(name)}, 600);
    }

    showMonster(monster){
        return (e) => {
            this.props.fetchMonster(monster.index)
            .then((newMonst) => this.setState({monsterInfo: newMonst.monster }))
        }
    }

    showCharacter(character){
        return (e) => {
            this.setState({characterInfo: character });
        }
    }

    addMonster(monster){
        return (e) =>{
            this.props.fetchMonster(monster.index)
            .then((newMonst) =>{ this.state.monsters.push({
                index: monster.index,
                initiative: Math.floor((Math.random()*20) + 1) + Math.floor((newMonst.monster.dexterity - 10)/2),
                hp: newMonst.monster.hit_points,
                name: monster.name,
            });
            this.setState({monstCount: this.state.monsters.length})
        });
        }
    }

    addCharacter(character){
        return (e) =>{
            if(this.state.players){
                this.state.players[character._id] = {
                    name: character.name,
                    initiative: Math.floor((Math.random()*20) + 1) + Math.floor((character.dex - 10)/2),
                    hp: character.hitPoints,
                    id: character._id,
                };
                this.setState({playersCount: Object.keys(this.state.players).length})
            }
        }
    }

    render(){
        const monsterInfo = this.state.monsterInfo ? (<div>
            <ul>
                <h2>More Monster Info</h2>
                <h3>Name: {this.state.monsterInfo.name}</h3>
                <h3>Armor Class: {this.state.monsterInfo.armor_class}</h3>
                <h3>Challenge Rating: {this.state.monsterInfo.challenge_rating}</h3>
                <ul>
                    Actions
                    {this.state.monsterInfo.actions.map(action => (
                       <li>{action.name} : {action.desc}</li> 
                    ))}
                </ul>
                <h3>Hit Points: {this.state.monsterInfo.hit_points} </h3>

            </ul>
        </div> ) : null;

        const characterInfo = this.state.characterInfo ? (
            <div>
                Character Stats:
                <h1>Name: {this.state.characterInfo.name}</h1>
                <h1>Race: {this.state.characterInfo.race}</h1>
                <h1>Class: {this.state.characterInfo.klass}</h1>
                <h1>Hit Points: {this.state.characterInfo.hitPoints}</h1>
                <h1>Strength: {this.state.characterInfo.str}</h1>
                <h1>Dexterity: {this.state.characterInfo.dex}</h1>
                <h1>Constitution: {this.state.characterInfo.con}</h1>
                <h1>Intelligence: {this.state.characterInfo.int}</h1>
                <h1>Wisdom: {this.state.characterInfo.wis}</h1>
                <h1>Charisma: {this.state.characterInfo.cha}</h1>
                <h1>Level: {this.state.characterInfo.lvl}</h1>
                <h1>Allow Magic: {this.state.characterInfo.allowMagic}</h1>
                <h1>Proficiencies: {this.state.characterInfo.proficiencies.map(prof => (<p>{prof}</p>))}</h1>
            </div>) : null; 

        return (<div>
            <h1>Create a game</h1>
            <form action="" onSubmit={this.handleSubmit} >
                <label htmlFor="">
                    Title: 
                    <input type="text" value={this.state.title} onChange={this.handleInput('title')}  />
                </label>
                
                <button>Make Game</button>
            </form>
            <ul>Players Chosen: {this.state.playersCount}
                {Object.values(this.state.players).map(player => (<li>
                    {player.name}
                </li> ))}
            </ul>
            <ul>Monsters Chosen: {this.state.monstCount}
                {this.state.monsters.map(monster => (<li>
                    {monster.name}
                </li> ))}
            </ul>
            <div>Players
                <label htmlFor=""> Find Player
                    <input type="text" value={this.state.searchPlayWord} onChange={this.getPlayers} />
                    </label>
                <ul>
                    Players
                    {this.props.characters.map(character => (<li> 
                        {character.name}
                        <button onClick={this.showCharacter(character)}>More Info</button>
                        <button onClick={this.addCharacter(character)}>Add Player</button>
                    </li>))}
                </ul>
            </div>
            {characterInfo}
            <div>Monster list
                <label htmlFor=""> Find Monster
                    <input type="text" value={this.state.searchMonstWord} onChange={this.getMonsters} />
                    </label>
                <ul>
                    monsters
                    {this.props.monsters.map(monster => (<li> 
                        {monster.name}
                        <button onClick={this.showMonster(monster)}>More Info</button>
                        <button onClick={this.addMonster(monster)}>Add Monster</button>
                    </li>))}
                </ul>
            </div>
            {monsterInfo}
        </div>)
    }
}

export default GameCreate;