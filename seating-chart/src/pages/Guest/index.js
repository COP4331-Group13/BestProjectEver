import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

export default function Guest() {
    return <GuestView />
}

class GuestView extends React.Component {

    render() {
        return(
            <div id = "wrapperbox">
                <div id = "welcome">
                    <Navigation history={this.props.history} towhere={"/Login"} text={"Home"} />
                    <h1>Welcome to the Guest Page</h1>
                    <h1>We are currently working on this page...</h1>
                </div>
            </div>

        );
    }

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
}
