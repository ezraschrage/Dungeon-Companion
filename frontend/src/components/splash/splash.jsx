
import React from 'react';

class Splash extends React.Component {

    render() {
        return (
            <div className="splash-container">
                <div className="outer-container">
                    <div className="large-main">
                        Enter the world of Dungeons and Dragons with Dungeon Companion.
                    </div>
                    <div className="medium-main">
                        Easy to use character creator for D&D 5th edition.
                    </div>
                    <div className="medium-main">
                        Battle Assisstant! Add monsters and players, keep track 
                        of initiative, and display relevant stats to streamline combat.
                    </div>
                </div>
            </div>
        )
    }
}

export default Splash;