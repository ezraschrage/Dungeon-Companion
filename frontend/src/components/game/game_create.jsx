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
        this.removeCharacter = this.removeCharacter.bind(this);
        this.removeMonster = this.removeMonster.bind(this);
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
        // debugger
        this.props.createGame(newGame)
        .then((data) => {
            if(data){
                this.props.history.push(`/games/${data.game._id}`) 
            }
        })
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
                const newMonsters = [...this.state.monsters]
                newMonsters.push({
                index: monster.index,
                initiative: Math.floor((Math.random()*20) + 1) + Math.floor((newMonst.monster.dexterity - 10)/2),
                hp: newMonst.monster.hit_points,
                name: monster.name,
                });
                this.setState({monsters: newMonsters})
            });
        }
    }

    removeMonster(idx){
        return (e) =>{
            const newMonsters = this.state.monsters.slice(0, idx).concat(this.state.monsters.slice(idx + 1, this.state.monsters.length));
            this.setState({monsters: newMonsters});
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
                }
        }
    }
    removeCharacter(id){
        return (e) =>{
            const newCharacters = Object.assign({}, this.state.characters);
            delete newCharacters[id];
            this.setState({characters: newCharacters});
        }
    }

    render(){
        const monsterInfo = this.state.monsterInfo ? < MonsterShow monster={this.state.monsterInfo} /> : <h2 className="no-details">No Monster Selected...</h2>;
        const characterInfo = this.state.characterInfo ?  <CharacterShow character={this.state.characterInfo} /> : <h2 className="no-details">No Character Selected...</h2>; 
        const errors = this.props.errors.length > 0 ? (<div className='game-create-error'>{this.props.errors.map(error => (
            <h2 key={error}>Warning: {error}</h2>
        ))}</div>) : null ;
        
        return (<div className='game-create-main'>
            <div className="game-title-container">
                <h1>Create a Game Session</h1>
            </div>

            <form action="" onSubmit={this.handleSubmit} >
                <label htmlFor="">Game Title: 
                    <input type="text" value={this.state.title} onChange={this.handleInput('title')}  />

                </label>
            </form>
            <div className='game-characters-main'>
                <div className='characters-chosen display'>
                    <h2>Characters Chosen</h2>
                        <ul>
                            {Object.values(this.state.characters).map(player => (<li key={player.name}>
                                <h3>{player.name}</h3>
                                 <button onClick={this.removeCharacter(player.id)}>Remove </button>
                            </li> ))}
                        </ul>
                </div>
                <div className='characters-available display'>
                <h2>Characters Available</h2>
                <ul>
                    {this.props.characters.map(character => (<li key={character.name}> 
                        <h3>{character.name}</h3>
                        <div>
                            <button onClick={this.addCharacter(character)}>Add Player</button>
                            <button onClick={this.showCharacter(character)}>More Info</button>
                        </div>
                    </li>))}
                </ul>
                </div>
                <div className="characters-show display">
                    <h2>Character Stats:</h2>
                    <div className="character-details">
                        {characterInfo}
                    </div>
                </div>

            </div>

            <div className='game-monsters-main'>
                <div className='monsters-chosen display'>
                    <h2>Monsters Chosen</h2>
                <ul>
                    {this.state.monsters.map((monster,idx) => (<li key={`${monster.name}${idx}`}>
                        <h3>{monster.name}</h3>
                         <button onClick={this.removeMonster(idx)}>Remove</button>
                    </li> ))}
                </ul>
                </div>
                <div className ='monsters-search display'>
                    <h2>Monster List</h2>
                <label htmlFor="" id="find-monster-search"> Find Monster: 
                    <input type="text" value={this.state.searchMonstWord} onChange={this.getMonsters} />
                    </label>
                <ul>

                    {this.props.monsters.map(monster => (<li key={monster.name}> 
                        <h3>{monster.name}</h3> 
                        <div>
                            <button onClick={this.addMonster(monster)}>Add Monster</button>
                            <button onClick={this.showMonster(monster)}>More Info</button>
                        </div>
                    </li>))}
                </ul>
            </div>
                <div className='monsters-show display'>
                    <h2>Monster Info:</h2>
                    {monsterInfo}
                </div>

            </div>
            {errors}
            <div className="button-container">
                <button id='create-game' onClick={this.handleSubmit}>MAKE GAME</button>
            </div>
        </div>)
    }
}

export default GameCreate;
