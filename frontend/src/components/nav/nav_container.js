import { connect } from "react-redux";
import { logout, login, signup } from '../../actions/session_actions';
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
    logout: () => dispatch(logout()),
    openLoginModal: modal => dispatch(openModal(modal))
    // signup: user => dispatch(signup(user))
});

export default connect(msp, mdp)(Nav)
