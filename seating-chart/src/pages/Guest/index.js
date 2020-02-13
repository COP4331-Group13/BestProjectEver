import React from 'react';
import '../../SeatPlanner.css';

export default function Guest() {
    return <GuestView />
}

class GuestView extends React.Component {

    render() {
        return(
            <div id = "welcome">
                <h1>Welcome to the Guest Page</h1>
                <h1>We are currently working on this page...</h1>
            </div>
        );
    }
}