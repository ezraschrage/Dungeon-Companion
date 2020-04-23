import React from 'react';
import {Link} from 'react-router-dom';

class GameShow extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getGame(this.props.match.params.gameId);
    }

    render(){
        if(!this.props.game) return (<div>loading</div>)
        return (<div>
            <Link to='/games'>GAMES INDEX</Link>
            <h1>GAME Show</h1>
            <h1>{this.props.game.title}</h1>
            <ul>
                <h1>players</h1>
                {this.props.game.players.map(player => (<li>{player.name}</li>))}
            </ul>
            <ul>
                <h1>monsters</h1>
                {this.props.game.monsters.map(monster => (<li>{monster.name}</li>))}
            </ul>
        </div>)
    }
}

export default GameShow;