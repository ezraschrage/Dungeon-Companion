import React from 'react';
import {Link} from 'react-router-dom';
import CharacterIndexContainer from '../character/character_index_container';

class GameIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getDMGames();
    }

    render() {
        return (
        <div className="game-index-container">
            <div className='game-index-main'>
                <div className="game-index-title">
                    <h1>Games</h1>
                    <Link to='/games/create'>Create Game</Link>
                </div>

                <div className="index-subcontainer">
                    <div className="game-thumbnail-container">
                        <ul>
                            {this.props.games.map(game => (
                                <Link to={`/games/${game._id}`} key={game._id}>
                                    <div className="game-thumbnail" >
                                    <li id="list" >
                                        <h2>{game.title}</h2>
                                        <h3>Players: {game.players.length}</h3>
                                        <h3>Monsters: {game.monsters.length}</h3>
                                        </li>
                                </div></Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <CharacterIndexContainer/>
         </div>)
      }
}

export default GameIndex;