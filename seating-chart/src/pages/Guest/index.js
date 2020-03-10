import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

export class GuestView extends React.Component {

    constructor(props) {
      super(props);
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
                  <h1>Welcome Guest, {this.props.storage.getUser()}!</h1>
                </div>
            </div>

        );
    }
    /*
    render () {
        return (
            <div className='box' id= 'seatingChart'>
                <h2>Pretend this is a seating chart...</h2>
            </div>
        );
    }

    render () {
        return (
            <div className='box' id= 'guestInfo'>
                <h2>Pretend this is information about you, the guest...</h2>
            </div>
        );
    }
    */
}

export default withRouter(GuestView);
