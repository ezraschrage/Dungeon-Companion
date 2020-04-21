import React from 'react'
import { withRouter } from 'react-router-dom';



const Nav = ({ currentUser, logout, openLoginModal, openSignupModal }) => {
    const signedOutNav = () => (
        <nav className="header">
            <h1>Dungeon Companion</h1>
            <button className="loginModal" onCLick={openLoginModal}>Log In</button>
            <button className="signupModal" onCLick={openSignupModal}>Sign Up</button>
        </nav>
    );

    const loggeddInNav = () => (
        <nav className="header-group">
            <h1>Dungeon Companion</h1>
            <button className="logout-button" onClick={logout}>Log Out</button>
        </nav>
    );

    return currentUser ? loggeddInNav() : signedOutNav();

}
export default Nav;