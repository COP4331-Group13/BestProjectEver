import {withRouter} from "react-router-dom";
import '../../SeatPlanner.css';
import React from "react";

export class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.props.storage.resetGuests();
        this.props.storage.resetItems();
        let gotEvents = this.props.storage.getEvents();
        if (gotEvents[0]) {
            this.state = {
                eventList: gotEvents[1],
                listItems: [],
                name: '',
                date: '',
                address: '',
                max: '',
                width: '',
                length: ''
            };

            for (let i = 0; i < this.state.eventList.length; i++) {
                this.state.listItems.push(
                    <EventItem
                        Key={this.state.eventList[i].pin}
                        Event={this.state.eventList[i]}
                        eventName={this.state.eventList[i].name}
                        storage={this.props.storage}
                        history={this.props.history}
                    />);
            }
        } else {
            this.state = {
                eventList: [],
                listItems: [],
                name: '',
                date: '',
                address: '',
                max: ''
            };
        }

        this.props.storage.setEvent(undefined);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeMax = this.changeMax.bind(this);
        this.changeWidth = this.changeWidth.bind(this);
        this.changeLength = this.changeLength.bind(this);
    }

    openDialog() {
  		document.getElementById('dialogbox').style.display = 'block';
  	}

  	closeDialog() {
        this.setState({
            name: '',
            date: '',
            address: '',
            max: '',
            width: '',
            length: ''
        });
  		document.getElementById('dialogbox').style.display = 'none';
  	}

    changeName(event) {
  		this.setState({name: event.target.value});
  	}

  	changeDate(event) {
  		this.setState({date: event.target.value});
  	}

  	changeAddress(event) {
  		this.setState({address: event.target.value});
  	}

  	changeMax(event) {
  		this.setState({max: event.target.value});
  	}

  	changeWidth(event) {
        this.setState({width: event.target.value});
    }

    changeLength(event) {
        this.setState({length: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let added = this.props.storage.addEvent(this.state);
        if (added[0]) {
          this.closeDialog();
          let listLength = this.state.eventList.length;
          this.setState({eventList: this.props.storage.getEvents()});
          this.setState(prevState => ({
              listItems: [...prevState.listItems, <EventItem
                  Key={listLength}
                  Event = {added[1]}
                  eventName = {added[1].name}
                  storage = {this.props.storage}
                  history = {this.props.history}
              />]
          }));
    		} else {
            this.setState({error: 'eventError'});
            this.setState({errorMessage: added[1]});
        }
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
    }

    render() {
        return (
                <div id="wrapperbox">
                    <div id = "welcome">
                        <div className='button' id='logout' onClick={this.handleLogout}>
                            Logout
                        </div>
                        <h1>Welcome, {this.props.storage.getUser().userName}!</h1>
                    </div>
                    <div id="listWrapper">
                        <ul id="eventList">{this.state.listItems}</ul>
                        <input type='submit' className='button' id='add_event' value='Add Event' onClick={() => this.openDialog()}/>
                    </div>
                    <div id="dialogbox">
                        <dialog open>
                            <div id="closeWindow">
                                <input type='submit' className='button2' id="closeButton" value='X' onClick={() => this.closeDialog()}/>
                            </div>
                            <h1>Add an Event</h1>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" className="textBox"
                                        id="name" placeholder="Event Name"
                                        value ={this.state.name}
                                        onChange={this.changeName} required />
                                <input type="datetime-local" className="textBox"
                                       id="date" placeholder="Date/Time"
                                       value ={this.state.date}
                                       onChange={this.changeDate} required />
                                <input type="text" className="textBox"
                                        id="address" placeholder="Address"
                                        value ={this.state.address}
                                        onChange={this.changeAddress} required/>
                                <input type="number" className="textBox"
                                        id="max" placeholder="Max # of Guests"
                                        value ={this.state.max}
                                        onChange={this.changeMax} required/>
                                <h2>Venue Dimensions</h2>
                                <h3 id="widthHead">Width</h3>
                                <h3 id="lengthHead">Length</h3>
                                <input type="number" className="dimBox"
                                       id="width" value ={this.state.width}
                                       onChange={this.changeWidth} required/>ft.
                                <input type="number" className="dimBox"
                                       id="width" value ={this.state.length}
                                       onChange={this.changeLength} required/>ft.
                                <div className='eventError' id={this.state.error} >
                                    {this.state.errorMessage}
                                </div>
                                <div id="buttonbox">
                                    <input type='submit' className='button' id='add_event' value='Submit'/>
                                </div>
                            </form>
                        </dialog>
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
            <li key={this.props.Key} className='eventItem' onClick={this.goToEvent} value={this.props.eventName}>{this.props.eventName}</li>
        );
    }
}


export default withRouter(EventList);
