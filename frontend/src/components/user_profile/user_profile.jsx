import React from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import charImage from '../../assets/images/char.png';
import dicePic from '../../assets/images/dice2.jpg';
import GameIndexContainer from '../game/game_index_container';



class UserProfile extends React.Component {
    constructor(props) {
        super(props)
       
    }

   

    render() {
        return (
          <div className="">
               <GameIndexContainer/>

           </div>
        );
    }
}
export default UserProfile;