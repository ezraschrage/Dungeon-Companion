
import React from 'react';
import { render } from 'react-dom';
import splashImage from '../../assets/images/download.jpeg';


class Splash extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <div className="mainDiv">
                    <div className="splashImage">
                        <img src={splashImage} alt="image of dragons"/>
                    </div>
                </div>
            </div>
        )
    }



}

export default Splash;