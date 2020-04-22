import React from 'react';
import {Link} from 'react-router-dom';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div>
            {`Welcome ${this.props.currentUser.username}`}
            <Link to='/characters'>Manage Characters</Link>
            <Link to='/games'>Your Games</Link>
         </div>
        )
    }
}
export default UserProfile;