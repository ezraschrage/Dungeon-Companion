import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import NavContainer from './nav/nav_container';
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container'
import UserProfileCOntainer from './user_profile/user_profile_container';
import CharacterCreateContainer from './character/character_create_container'
import CharacterIndexContainer from './character/character_index_container';
import GameIndexContainer from './game/game_index_container';
import GameShowContainer from './game/game_show_container';
import GameCreateContainer from './game/game_create_container';

// import MainPage from './main/main_page';

const App = () => (
    <div>
        <NavContainer />
        <Modal />
    <Switch>
        <AuthRoute exact path="/" component={SplashContainer} />
        <ProtectedRoute exact path="/profile" component={UserProfileCOntainer} />
        <ProtectedRoute exact path="/characters/create" component={CharacterCreateContainer} />
        <ProtectedRoute exact path="/games/create" component={GameCreateContainer} />
        <ProtectedRoute exact path="/games/:gameId" component={GameShowContainer} />
        <ProtectedRoute exact path="/games" component={GameIndexContainer} />
        <ProtectedRoute exact path="/characters/:charId" component={CharacterIndexContainer} />
        <ProtectedRoute exact path="/characters" component={CharacterIndexContainer} />
    </Switch>
    </div>

);

export default App;