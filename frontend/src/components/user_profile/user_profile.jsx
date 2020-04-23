import React from 'react';
import {Link} from 'react-router-dom';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <div classNmae="profileImage">
            <div calssName="userName">{`Welcome ${this.props.currentUser.username}`}</div>
            <div className="yourChars"><Link to="/characters">Manage characters</Link></div>
            <div className="yourGames"><Link to='/games'>Your Games</Link></div>
          </div>
        );
    }
}
export default UserProfile;