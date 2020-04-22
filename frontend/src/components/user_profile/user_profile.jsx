import React from 'react';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div>{`Welcome ${this.props.currentUser.username}`}</div>
        )
    }
}
export default UserProfile;