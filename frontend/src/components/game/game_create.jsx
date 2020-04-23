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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMonsters = this.getMonsters.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.addCharacter = this.addCharacter.bind(this);
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
        return (<div>
            Create a game
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
                        <button onClick={this.addCharacter(character)}>Add Player</button>
                    </li>))}
                </ul>
            </div>
            <div>Monster list
                <label htmlFor=""> Find Monster
                    <input type="text" value={this.state.searchMonstWord} onChange={this.getMonsters} />
                    </label>
                <ul>
                    monsters
                    {this.props.monsters.map(monster => (<li> 
                        {monster.name}
                        <button onClick={this.addMonster(monster)}>Add Monster</button>
                    </li>))}
                </ul>
            </div>
        </div>)
    }
}

export default GameCreate;