import { connect } from "react-redux";
import { logout, login, signup, receiveErrors } from '../../actions/session_actions';
import Nav from  './nav';
import { openModal, closeModal } from '../../actions/modal_actions';

const msp = (state) => {
    const user = state.session ? state.session.user : null;
    return {
        currentUser: user,
        errors: state.errors.session
    }
};

const mdp = dispatch => ({
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    logout: () => dispatch(logout()),
    openLoginModal: () => (
        dispatch(openModal("loginForm")),
        dispatch(receiveErrors(""))
    ),
    openSignupModal: () => (
        dispatch(openModal("signupForm")),
        dispatch(receiveErrors(""))
    ),
    closeModal: () => dispatch(closeModal())
});

export default connect(msp, mdp)(Nav)
