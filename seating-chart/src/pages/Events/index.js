import {withRouter} from "react-router-dom";
import '../../SeatPlanner.css';
import React from "react";

export class EventList extends React.Component {

    constructor(props) {
        super(props);
        const eventList = this.props.storage.getEvents();
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.storage.addEvent('Event');
        this.props.storage.setEvent('Event');
        this.props.history.push('/planner');
    }

    render() {
        return (
            <div id="wrapperbox">
                <div id = "welcome">
                    <h1>Welcome, {this.props.storage.getUser()}!</h1>
                    <input type='submit' className='button' id='add_event' value='Add Event' onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}



export default withRouter(EventList);