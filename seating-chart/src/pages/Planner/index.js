import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';


class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clicked: 'false', name: '', email: '',
			phone: '', address: '', search: '', curEvent:this.props.storage.getEvent()};

		this.openDialog = this.openDialog.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
		this.changePhone = this.changePhone.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
	}

	openDialog() {
		document.getElementById('dialogbox').style.display = 'block';
	}

	closeDialog() {
		document.getElementById('dialogbox').style.display = 'none';
	}

	changeName(event) {
		this.setState({name: event.target.value});
	}

	changeEmail(event) {
		this.setState({email: event.target.value});
	}

	changeAddress(event) {
		this.setState({address: event.target.value});
	}

	changePhone(event) {
		this.setState({phone: event.target.value});
	}

	changeSearch(event) {
		this.setState({search: event.target.value});
	}

	handleSubmit(event) {
			event.preventDefault();
			let added = this.props.storage.addGuest(this.state);
			if (added[0]) {
				this.closeDialog();
				alert("Guest was successfully added!");
			} else {
					this.setState({error: 'guestError'});
					this.setState({errorMessage: added[1]});
			}
	}

	render() {
		return (
			<div id="wrapperbox">
				<div id = "welcome">
				<Navigation history={this.props.history} towhere={"/events"} text={"Events"} />
				<h1>{this.state.curEvent.name}</h1>
				</div>
				<div id="sidebar">
					<div id="search">
						<form>
							<input type="text" className="textBox" id="search"
								placeholder="Search..." onChange={this.changeSearch}/>
						</form>
					</div>
					<input type='submit' className='button' id='add_guest' value='Add Guest' onClick={() => this.openDialog()}/>
				</div>

				<div id="dialogbox">
					<dialog open>
						<div id="closeWindow">
							<input type='submit' id="closeButton" value='X' onClick={() => this.closeDialog()}/>
						</div>
						<h1>Add a Guest</h1>
						<form onSubmit={this.handleSubmit}>
							<input type="text" className="textBox" id="name"
								placeholder="Name" value ={this.state.name} onChange={this.changeName} required/>
							<input type="email" className="textBox" id="email"
								placeholder="E-mail" value ={this.state.email} onChange={this.changeEmail} required/>
							<input type="text" className="textBox" id="phone"
								placeholder="Phone Number" value ={this.state.phone_number} onChange={this.changePhone} required/>
							<input type="text" className="textBox" id="address"
								placeholder="Address" value ={this.state.address} onChange={this.changeAddress} required/>
							<div className='eventError' id={this.state.error} >
								{this.state.errorMessage}
							</div>
							<div id="buttonbox">
								<input type='submit' className='button' id='add_guest' value='Submit'/>
							</div>
						</form>
					</dialog>
				</div>
			</div>
		);

	}
}

export default withRouter(CreateGuest);
