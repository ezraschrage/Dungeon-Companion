import React from 'react';
import CharacterShow from './game_character_show';
import MonsterShow from './game_monster_show';

class GameCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            characters: {},
            monsters: [],
            monstCount: 0,
            charactersCount: 0,
            searchMonstWord: '',
            searchCharWord: '',
            monsterInfo: null,
            characterInfo: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMonsters = this.getMonsters.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.addCharacter = this.addCharacter.bind(this);
        this.showMonster = this.showMonster.bind(this);
        this.showCharacter = this.showCharacter.bind(this);
        this.getCharacters = this.getCharacters.bind(this);
        this.timer = null;
    }
    
    componentDidMount(){
        this.props.getCharacters();
    }

    handleSubmit(e){
        e.preventDefault();
        const newGame = {
            title: this.state.title,
            players: Object.values(this.state.characters),
            monsters: this.state.monsters,
        }
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

    addMonster(monster){
        return (e) =>{
            this.props.fetchMonster(monster.index)
            .then((newMonst) =>{ 
                this.state.monsters.push({
                index: monster.index,
                initiative: Math.floor((Math.random()*20) + 1) + Math.floor((newMonst.monster.dexterity - 10)/2),
                hp: newMonst.monster.hit_points,
                name: monster.name,
                });
                this.setState({monstCount: this.state.monsters.length})
            });
        }
    }

    showCharacter(character){
        return (e) => {
            this.setState({characterInfo: character });
        }
    }

    getCharacters(){
        // this.setState({searchCharWord: e.target.value});
        // clearTimeout(this.timer);
        // const name = e.target.value;
        // this.timer = setTimeout( () => {if(name !== '') search(name)}, 600);
    }

    addCharacter(character){
        return (e) =>{
            if(this.state.characters){
                const characters = Object.assign({},this.state.characters );
                characters[character._id] = {
                    name: character.name,
                    initiative: Math.floor((Math.random()*20) + 1) + Math.floor((character.dex - 10)/2),
                    hp: character.hitPoints,
                    id: character._id,
                };
                this.setState({characters: characters});
                this.setState({charactersCount: Object.keys(this.state.characters).length});
            }
        }
    }

    render(){
        const monsterInfo = this.state.monsterInfo ? < MonsterShow monster={this.state.monsterInfo} /> : null;
        const characterInfo = this.state.characterInfo ?  <CharacterShow character={this.state.characterInfo} /> : null; 

        return (<div>
            <h1>Create a game</h1>
            <form action="" onSubmit={this.handleSubmit} >
                <label htmlFor="">
                    Title: 
                    <input type="text" value={this.state.title} onChange={this.handleInput('title')}  />
                </label>
                
                <button>Make Game</button>
            </form>
            <ul>Players Chosen: {this.state.charactersCount}
                {Object.values(this.state.characters).map(player => (<li>
                    {player.name}
                </li> ))}
            </ul>
            <ul>Monsters Chosen: {this.state.monstCount}
                {this.state.monsters.map(monster => (<li>
                    {monster.name}
                </li> ))}
            </ul>
            <div>
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
