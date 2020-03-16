import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

export class GuestView extends React.Component {

    constructor(props) {
      super(props);

      this.props.storage.getSingleEvent();

      this.state = {
        curUser: this.props.storage.getUser(),
        curEvent: this.props.storage.getEvent(),
        curGroup: this.props.storage.getGuestGroup()
      };

      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
    }

    render() {
        return(
            <div id = "wrapperbox">
                <div id = "welcome">
                  <div className='button' id='logout' onClick={this.handleLogout}>
                      Logout
                  </div>
                  <h1>Welcome, {this.state.curUser.name}!</h1>
                </div>

                <div id= 'chartGuest'>
                  <h1>Pretend this is a seating chart...</h1>
                </div>

                <div id= 'guestInfo'>
                  <div className='box' id='guestBox'>
                    <h3>Account Information</h3>
                    <div id= 'guestInformation'>
                      <p><b>Guest ID: </b>{this.state.curUser.guestId}</p>
                      <p><b>Name: </b>{this.state.curUser.name}</p>
                      <p><b>Email: </b>{this.state.curUser.userName}</p>
                      <p><b>Phone Number: </b>{this.state.curUser.phoneNumber}</p>
                      <p><b>Address: </b>{this.state.curUser.address}</p>
                    </div>
                  </div>
                  <div className='box' id= 'preferencesBox'>
                    <h3>Preferences</h3>
                    <div id='guestPreferences'>
                      <p> here goes guest preferences </p>
                    </div>
                  </div>
                  <div className='box' id= 'groupsBox'>
                    <h3>Groups</h3>
                    <div id='guestGroups'>
                      <p><b>Your Event Group: </b>{this.state.curGroup[1]}</p>
                    </div>
                  </div>
                  <div className='box' id='eventBox'>
                    <h3>Event Information</h3>
                    <div id= 'eventInformation'>
                      <p><b>Event Name: </b>{this.state.curEvent.name}</p>
                      <p><b>Event Address: </b>{this.state.curEvent.address}</p>
                      <p><b>Event Date/Time: </b>{this.state.curEvent.eventDate}</p>
                    </div>
                  </div>
                </div>
            </div>

        );
    }
}

export default withRouter(GuestView);
