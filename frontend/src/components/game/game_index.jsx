import React from 'react';
import {Link} from 'react-router-dom';

class GameIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getDMGames();
    }

    render(){
        return (<div>
            <Link to='/profile'>Back to Profile</Link>
            GAME INDEX
            <Link to='/games/create'>Create Game</Link>
            <ul>
                {this.props.games.map(game => (
                    <li key={game._id}>Game: {game.title}
                    <Link to={`/games/${game._id}`}><button>more</button></Link></li>
                ))}
            </ul>
            
        </div>)
    }
}

export default GameIndex;