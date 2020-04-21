import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import NavContainer from './nav/nav_container';

// import MainPage from './main/main_page';

const App = () => (
    <div>
        <NavContainer />

        <Switch>
            {/* <AuthRoute exact path="/" component={MainPage} /> */}
            {/* <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} /> */}
        </Switch>
    </div>
);

export default App;