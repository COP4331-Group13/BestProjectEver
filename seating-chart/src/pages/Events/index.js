import {withRouter} from "react-router-dom";
import '../../SeatPlanner.css';
import React from "react";

export class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {eventList:this.props.storage.getEvents(), listItems:[]};
        for (let i = 0; i < this.state.eventList.length; i++) {
            this.state.listItems.push(
                <EventItem
                    Key={i}
                    Event={this.state.eventList[i] + i}
                    storage = {this.props.storage}
                    history = {this.props.history}
                />);
        }
        this.props.storage.setEvent(undefined);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.storage.addEvent('Event');
        this.setState({eventList: this.props.storage.getEvents()});
        this.setState(prevState => ({
            listItems: [...prevState.listItems, <EventItem
                Key={this.state.eventList.length - 1}
                Event = {'Event' + (this.state.eventList.length)}
                storage = {this.props.storage}
                history = {this.props.history}
            />]
        }));
    }

    render() {
        return (
            <div id="wrapperbox">
                <div id = "welcome">
                    <h1>Welcome, {this.props.storage.getUser()}!</h1>
                </div>
                <div id="listWrapper">
                    <ul id="eventList">{this.state.listItems}</ul>
                    <input type='submit' className='button' id='add_event' value='Add Event' onClick={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

class EventItem extends React.Component {
    constructor(props) {
        super(props);
        this.goToEvent = this.goToEvent.bind(this);
    }

    goToEvent(event) {
        event.preventDefault();
        this.props.storage.setEvent(this.props.Event);
        this.props.history.push('/planner');
    }

    render() {
        return (
            <li key={this.props.Key} className='eventItem' onClick={this.goToEvent}>{this.props.Event}</li>
        );
    }
}


export default withRouter(EventList);