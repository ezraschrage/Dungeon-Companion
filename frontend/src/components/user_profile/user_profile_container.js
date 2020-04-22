import { connect } from 'react-redux';
import UserProfile from './user_profile';


const msp = state => ({
    currentUser: state.session.user
});

// const mdp = dispatch => ({

// });

export default connect(msp, null)(UserProfile)