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
        return (
        <div className="game-index-container">
            <div className='game-index-main'>
                <div className="game-index-title">
                    <Link to='/profile'>Back to Profile</Link>
                    <h1>Manage Games</h1>
                    <Link to='/games/create'>Create Game</Link>
                </div>

                <div className="index-subcontainer">
                    <div className="game-thumbnail-container">
                        <ul>
                            {this.props.games.reverse().map(game => (
                                <div className="game-thumbnail">
                                    <li id="list" key={game._id}>{game.title}</li>
                                    <Link to={`/games/${game._id}`}><button id="moreButton">more</button></Link>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default GameIndex;