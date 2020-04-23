
import React from 'react';
import { render } from 'react-dom';



class Splash extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="splash-container">
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
                    <div className="medium-main">
                        Character generator! Answer a series of questions and 
                        a pre-made character will be made for you (coming soon!)
                    </div>
            </div>
        )
    }



}

export default Splash;