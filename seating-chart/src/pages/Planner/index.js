import React from 'react';
import '../../SeatPlanner.css';

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clicked: 'false', name: '', email: '', phone: '', address: ''};


		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
		this.changePhone = this.changePhone.bind(this);
	}

	openDialog() {
		this.setState({
			visible: true
		});
	}

	closeDialog() {
		this.setState({
			visible: false
		});
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

	render() {
		return (
			<div id="wrapperbox">
				<div id = "welcome">
					<h1>Welcome to the Planner Page</h1>
					<h1>We are currently working on this page...</h1>
				</div>
				<div id = "buttonbox">
					<input type='submit' className='button' id='add_guest' value='Add Guest' onClick={() => this.openDialog()}/>
				</div>
			</div>

			<div id="dialogbox">
				<dialog open>
					<h1>Add a Guest</h1>
					<form>
						<input type="text" className="textBox" id="name" 
							placeholder="Name" onChange={this.changeName}/>
						<input type="text" className="textBox" id="email" 
							placeholder="E-mail" onChange={this.changeEmail}/>
						<input type="text" className="textBox" id="phone" 
							placeholder="Phone Number" onChange={this.changePhone}/>
						<input type="text" className="textBox" id="address" 
							placeholder="Address" onChange={this.changeAddress}/>
					<a href="javascript:void(0);" onClick={() => this.closeDialog()}>Close</a>
					</form>
				</dialog>
			</div>
		);

	}
}

export default function Planner() {
	return <CreateGuest />
}
