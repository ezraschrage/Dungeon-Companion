import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import charImage from '../../assets/images/char.png';
import dicePic from '../../assets/images/dice2.jpg';



class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.props.history.push('/characters')
    }

    render() {
        return (
          <div className="main">
            <div className="profileImage">
              <div className="userName">{`Welcome ${this.props.currentUser.username}`}</div>
              <div className="yourChars" onClick={this.handleClick}>
                <div><img className="character" src={charImage} alt="image of character" /></div>
                <div><Link to="/characters">Manage Characters</Link></div>
              </div>
              <div className="yourGames" onClick={this.handleClick}>
                <div><img className="dice" src={dicePic} alt="dice picture"/></div>
                <div><Link to="/games">Your Games</Link></div>
              </div>
            </div>
          </div>
        );
    }
}
export default UserProfile;