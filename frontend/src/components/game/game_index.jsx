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
                            {this.props.games.reverse().map(game => (
                                <div className="game-thumbnail" key={game._id}>
                                    <li id="list" >{game.title}</li>
                                    <Link to={`/games/${game._id}`}><button id="moreButton">Play</button></Link>
                                    <button id="delete-game-button" onClick={() => {
                                        this.props.deleteGame(game._id);
                                        window.location.reload();
                                        }}>Delete</button>
                                </div>
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