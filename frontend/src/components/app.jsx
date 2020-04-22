import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import NavContainer from './nav/nav_container';
import Modal from './modal/modal';
import CharacterCreateContainer from './character/character_create_container'
// import MainPage from './main/main_page';

const App = () => (
    <div>
        <NavContainer />
        <Modal />
        
        <Switch>
            <AuthRoute exact path="/create/character" component={CharacterCreateContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;