import { connect } from "react-redux";
import { login, signup } from '../../actions/session_actions';
import Splash from './splash';

const msp = (state) => ({
    errors: state.errors.session
});

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user))
});

export default connect(msp, mdp)(Splash)