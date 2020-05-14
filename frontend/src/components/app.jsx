import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavContainer from './nav/nav_container';
import Modal from './modal/modal';
import SplashContainer from './splash/splash_container'
import UserProfileContainer from './user_profile/user_profile_container';
import CharacterCreateContainer from './character/character_create_container';
import CharacterEditContainer from './character/character_edit_container';
import CharacterIndexContainer from './character/character_index_container';
import GameIndexContainer from './game/game_index_container';
import GameShowContainer from './game/game_show_container';
import GameCreateContainer from './game/game_create_container';
import gitImg from '../assets/images/git2.png';

const App = () => (
    <div>
        <NavContainer />
        <Modal />
        <Switch>
            <AuthRoute exact path="/" component={SplashContainer} />
            <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
            <ProtectedRoute exact path="/profile/:charId" component={UserProfileContainer} />
            <ProtectedRoute exact path="/characters/create" component={CharacterCreateContainer} />
            <ProtectedRoute exact path="/characters/edit/:charId" component={CharacterEditContainer} />
            <ProtectedRoute exact path="/games/create" component={GameCreateContainer} />
            <ProtectedRoute exact path="/games/:gameId" component={GameShowContainer} />
            <ProtectedRoute exact path="/games" component={GameIndexContainer} />
            <ProtectedRoute exact path="/characters" component={CharacterIndexContainer} />
        </Switch>
        <footer>
                <a href="https://github.com/ezraschrage/Dungeon-Companion" target="_blank" ><img className="git" src={gitImg} alt="git symbol"/></a>
        </footer>
    </div>

);

export default App;