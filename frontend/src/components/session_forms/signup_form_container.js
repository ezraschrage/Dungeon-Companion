import { connect } from 'react-redux';
import { signup, receiveErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { openModal, closeModal } from "../../actions/modal_actions";

const msp = (state) => {
    return {
        errors: state.errors.session
    };
};

const mdp = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        loginForm: () => (
            dispatch(openModal("loginForm")),
            dispatch(receiveErrors(""))
        ),
        // signupForm: () => dispatch(openModal("signupForm")),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(msp, mdp)(SignupForm);