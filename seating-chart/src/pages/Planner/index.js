import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		let gotGuests = this.props.storage.getGuests();
		if (gotGuests[0]) {
				this.state = {
						guestList: gotGuests[1],
						listItems: [],
						clicked: 'false',
						name: '',
						email: '',
						phone: '',
						address: '',
						search: '',
						curEvent:this.props.storage.getEvent()
				};

				for (let i = 0; i < this.state.guestList.length; i++) {
						this.state.listItems.push(
								<GuestItem
										Key={this.state.guestList[i].guestId}
										Guest={this.state.guestList[i]}
										guestName={this.state.guestList[i].name}
										guestEmail={this.state.guestList[i].userName}
										guestPhone={this.state.guestList[i].phoneNumber}
										guestAddress={this.state.guestList[i].address}
										guestId={this.state.guestList[i].guestId}
										storage={this.props.storage}
										history={this.props.history}
								/>);
				}
		} else {
				this.state = {
						guestList: [],
						listItems: [],
						clicked: 'false',
						name: '',
						email: '',
						phone: '',
						address: '',
						search: '',
						curEvent:this.props.storage.getEvent()
				};
		}

		this.props.storage.setGuest(undefined);
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
				let listLength = this.state.guestList.length;
				this.setState({guestList: this.props.storage.getGuests()});
				this.setState(prevState => ({
						listItems: [...prevState.listItems, <GuestItem
							Key={this.state.guestList.guestId}
							Guest={added[1]}
							guestName={added[1].name}
							guestEmail={added[1].userName}
							guestPhone={added[1].phoneNumber}
							guestAddress={added[1].address}
							guestId={added[1].guestId}
							storage={this.props.storage}
							history={this.props.history}
						/>]
				}));
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
							<input type="text" className="textBox" id="searchBox"
								placeholder="Search..." onChange={this.changeSearch}/>
						</form>
					</div>
					<div id="list">
						<ul id="guestList">{this.state.listItems}</ul>
					</div>
					<div id="add">
						<input type='submit' className='button' id='add_guest' value='Add Guest' onClick={() => this.openDialog()}/>
					</div>
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
								placeholder="Phone Number" value ={this.state.phone} onChange={this.changePhone} required/>
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

class GuestItem extends React.Component {
    constructor(props) {
        super(props);

				this.openDialog = this.openDialog.bind(this);
				this.closeDialog = this.closeDialog.bind(this);
    }

		openDialog() {
			this.props.storage.setGuest(this.props.Guest);
			document.getElementById(this.props.Key).style.display = 'block';
		}

		closeDialog() {
			this.props.storage.resetGuest();
			document.getElementById(this.props.Key).style.display = 'none';
		}

    render() {
        return (
					<div id="sidebar">
						<div id="guestListItem">
            	<li
								key={this.props.Key} className='guestItem' value={this.props.guestName}>{this.props.guestName}
							</li>
							<input type='submit' id='guestItemOpen' value='+' onClick={() => this.openDialog()}/>
						</div>

						<div className="dialogbox2" id={this.props.Key}>
							<dialog open>
									<div id='guestBoxInfo'>
										<h1>{this.props.guestName}</h1>
										<label><b>Guest ID:</b> {this.props.guestId}</label>
										<form id="formGuest" onSubmit={() => this.closeDialog()}>
											<p>
												<label>Name</label>
												<input type="text" className="textBox" id="name"
													placeholder={this.props.guestName} />
											</p>
											<p>
												<label>Email</label>
												<input type="email" className="textBox" id="email"
												placeholder={this.props.guestEmail} />
											</p>
											<p>
												<label>Phone</label>
												<input type="text" className="textBox" id="phone"
												placeholder={this.props.guestPhone} />
											</p>
											<p>
												<label>Address</label>
												<input type="text" className="textBox" id="address"
												placeholder={this.props.guestAddress}/>
											</p>
										</form>
										<input type='submit' className='button' id='guestButtons' value='Save'/>
										<input type='submit' className='button' id='guestButtons' value='Cancel' onClick={() => this.closeDialog()}/>
									</div>

									<div id='guestBoxPreferences'>
										<h1>Preferences</h1>
									</div>

									<div id='guestBoxGroups'>
										<h1>Groups</h1>
									</div>
							</dialog>
						</div>
					</div>
				);
    }
}

export default withRouter(CreateGuest);
