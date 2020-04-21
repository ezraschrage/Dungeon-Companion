import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect, connectAdvanced } from 'react-redux';
import SignupFormContainer from '../session_forms/signup_form_container';
import LoginFormContainer from '../session_forms/login_form_container';
import './modal.css';


function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'loginForm':
            component = <LoginFormContainer />;
            break;
        case 'signupForm':
            component = <SignupFormContainer />;
            break;
        default:
            return null;
    }

    return (
            <div className="modal-background" onClick={closeModal}>
                <div className="modal-child" onCLick={e => e.stopPropagation()}>
                    { component }
                </div>
            </div>
    );

}

const msp = (state) => ({
    modal: state.ui.modal
});

const mdp = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    signupForm: () => dispatch(openModal("signupForm"))
});

export default connect(msp, mdp)(Modal);