import { connect } from 'react-redux';
import UserProfile from './user_profile';

const msp = state => ({
    currentUser: state.session.user
});

export default connect(msp, null)(UserProfile)