import React from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import charImage from '../../assets/images/char.png';
import dicePic from '../../assets/images/dice2.jpg';



class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          redirect: false
        }
        this.handleClick = this.handleClick.bind(this)
       
    }

    handleClick() {
      this.props.history.push('/characters')
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/games' />
      }
    }
   

    render() {
        return (
          <div className="main">
              <div className="welcomeUserName">{`Welcome ${this.props.currentUser.username}`}</div>
            <div className="profileImage">
              <div className="yourChars" onClick={this.handleClick}>
                <div><img className="character" src={charImage} alt="image of character" /></div>
                <div><Link to="/characters">Manage Characters</Link></div>
              </div>
              {this.renderRedirect()}
              <div className="yourGames" onClick={this.setRedirect}>
                <div><img className="dice" src={dicePic} alt="dice picture"/></div>
                <div><Link to="/games">Your Games</Link></div>
              </div>
            </div>
          </div>
        );
    }
}
export default withRouter(UserProfile);