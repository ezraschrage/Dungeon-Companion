import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';


const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginFormContainer} />
      <Route exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;