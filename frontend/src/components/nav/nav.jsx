import React from 'react'
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, logout, openLoginModal, openSignupModal }) => {
    const signedOutNav = () => (
      <nav className="header">
        <div className="logo">
          <h1>Dungeon Companion</h1>
        </div>
        <div className="nav-Buttons">
          <button className="nav-Button" onClick={openLoginModal}>
            Log In
          </button>
          <button className="nav-Button" onClick={openSignupModal}>
            Sign Up
          </button>
        </div>
      </nav>
    );

    const loggeddInNav = () => (
      <nav className="header">
        <div className="logo">
          <h1><Link to='/profile'>Dungeon Companion</Link></h1>
        </div>
        <div className="nav-Buttons">
          <Link to='/profile'><button className="nav-Button">Profile</button></Link>
          <button className="nav-Button" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>
    );

    return currentUser ? loggeddInNav() : signedOutNav();

}
export default Nav;