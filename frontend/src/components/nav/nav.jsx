import React from 'react'
import { withRouter, Link } from 'react-router-dom';



const Nav = ({ currentUser, logout, openLoginModal, openSignupModal }) => {
    const signedOutNav = () => (
      <nav className="header">
        <div className="logo">
          <h1>Dungeon Companion</h1>
        </div>
        <div className="sessionButtons">
          <button className="sessionButton" onClick={openLoginModal}>
            Log In
          </button>
          <button className="sessionButton" onClick={openSignupModal}>
            Sign Up
          </button>
        </div>
      </nav>
    );

    const loggeddInNav = () => (
      <nav className="header">
        <div className="logo">
          <h1> <Link to='/profile'>Dungeon Companion</Link></h1>
        </div>
        <div className="profileButton"><Link to='/profile'>Profile</Link></div>
        <div className="sessionButtons">
          <button className="button" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
    );

    return currentUser ? loggeddInNav() : signedOutNav();

}
export default Nav;