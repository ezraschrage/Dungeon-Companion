import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import NavContainer from './nav/nav_container';
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container'
import UserProfileCOntainer from './user_profile/user_profile_container';
// import MainPage from './main/main_page';

const App = () => (
    <div>
        <NavContainer />
        <Modal />
      

        <AuthRoute exact path="/" component={SplashContainer} />
        <ProtectedRoute exact path="/profile" component={UserProfileCOntainer} />
 
   
 </div>
);

export default App;