import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import CharacterCreateContainer from "../components/character/character_create_container"

import MainPage from './main/main_page';

const App = () => (
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute path="/" component={CharacterCreateContainer} />
    </Switch>
);

export default App;