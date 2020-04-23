import React from 'react';
import {Link} from 'react-router-dom';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

          <div classNmae="profileImage">
            <div className="userName">{`Welcome ${this.props.currentUser.username}`}</div>
            <div className="yourChars"><Link to="/characters">Your characters</Link></div>
            <Link to='/games'>Your Games</Link>
         </div>
        )

    }
}
export default UserProfile;