import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import CharacterCreateContainer from './character/character_create_container'

const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/create/character" component={CharacterCreateContainer} />
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;