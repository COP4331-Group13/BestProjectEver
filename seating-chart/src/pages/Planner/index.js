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
						curEvent:this.props.storage.getEvent(),
					// Should be changed to take value from curEvent
						layoutWidth: 900,
						layoutHeight: 750
				};
				this.state.layoutWidth = this.state.curEvent.layout_width;
				this.state.layoutHeight = this.state.curEvent.layout_length;

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
						curEvent:this.props.storage.getEvent(),
						layoutWidth: 900,
						layoutHeight: 750
				};
				this.state.layoutWidth = this.state.curEvent.layout_width;
				this.state.layoutHeight = this.state.curEvent.layout_length;
		}

		this.props.storage.setGuest(undefined);
		this.openDialog = this.openDialog.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
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

	handleDelete() {
		if (window.confirm("Are you sure you want to delete the event: " + this.state.curEvent.name + " ?\nThis will delete its preferences and guests attached to this event.") === true) {
				let deleted = this.props.storage.deleteEvent();
				if (deleted) {
					alert("Event deleted!");
					this.props.history.push("/events");
				} else {
						alert("Error deleting event");
				}
		} else {
			// do nothing
		}
	}

	handleSubmit(event) {
			event.preventDefault();
			let added = this.props.storage.addGuest(this.state);
			if (added[0]) {
				this.closeDialog();
				let listLength = this.state.guestList.length;
				this.setState({guestList: this.props.storage.getGuests()});
				this.setState(prevState => ({
						listItems: [...prevState.listItems, <GuestItem
							Key={added[1].guestId}
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
					<div className='button' id='deleteEvent' onClick={this.handleDelete}>
							Delete Event
					</div>
					<h1>{this.state.curEvent.name}</h1>
				</div>

				<div id="chartPlanner">
					<div id="seatingChart">
						<Layout height={this.state.layoutHeight} width={this.state.layoutWidth} storage={this.props.storage}/>
					</div>
					<div id="chartItems">
						<h1>items here</h1>
					</div>
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
					<div id="properties">
						<p><label>Item properties</label></p>
						<p><label>Room properties</label></p>
					</div>
				</div>

				<div id="dialogbox">
					<dialog open>
						<div id="closeWindow">
							<input type='submit' className="button2" id="closeButton" value='X' onClick={() => this.closeDialog()}/>
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

				this.state = {
						name: this.props.guestName,
						email: this.props.guestEmail,
						phone: this.props.guestPhone,
						address: this.props.guestAddress
				};

				this.changeName = this.changeName.bind(this);
				this.changeEmail = this.changeEmail.bind(this);
				this.changeAddress = this.changeAddress.bind(this);
				this.changePhone = this.changePhone.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.openDialog = this.openDialog.bind(this);
				this.closeDialog = this.closeDialog.bind(this);
				this.disableForm = this.disableForm.bind(this);
				this.enableForm = this.enableForm.bind(this);
				this.deleteForm = this.deleteForm.bind(this);
				this.cancelForm = this.cancelForm.bind(this);
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

		openDialog() {
			this.props.storage.setGuest(this.props.Guest);
			document.getElementById(this.props.Key).style.display = 'block';
		}

		closeDialog() {
			this.disableForm();
			this.cancelForm();
			this.props.storage.resetGuest();
			document.getElementById(this.props.Key).style.display = 'none';
		}

		deleteForm() {
			let curGuest = this.props.storage.getGuest();
			if (window.confirm("Are you sure you want to delete the guest: " + curGuest.guestId + " ?") === true) {
					let deleted = this.props.storage.deleteGuest();
					if (deleted) {
						this.closeDialog();
						window.location.reload(); // for now pages reload after deleting so that it updates the guest list.
						alert("Guest deleted!");
					} else {
							alert("Error deleting guest");
					}
			} else {
				// do nothing
			}
		}

		cancelForm() {
			this.disableForm();
			this.setState({name: this.props.guestName});
			this.setState({email: this.props.guestEmail});
			this.setState({phone: this.props.guestPhone});
			this.setState({address: this.props.guestAddress});
		}

		disableForm() {
			let inputForm = document.getElementsByClassName('textFormBox');
			for (let i = 0; i < inputForm.length; i++) {
    		inputForm[i].disabled = true;
			}
		}

		enableForm() {
			let inputForm = document.getElementsByClassName('textFormBox');
			for (let i = 0; i < inputForm.length; i++) {
    		inputForm[i].disabled = false;
			}
		}

		handleSubmit(event) {
			event.preventDefault();
			let curGuest = this.props.storage.getGuest();
			if (window.confirm("Do you want to save changes?") === true) {
					let updated = this.props.storage.updateGuest(this.state);
					if (updated) {
						this.closeDialog();
						window.location.reload(); // for now page reloads to get the updated info.
						alert("Guest info updated!");
					}
			} else {
				// do nothing
			}
		}

    render() {
        return (
					<div>
						<div id="guestListItem">
            	<li
								key={this.props.Key} className='guestItem' value={this.props.guestName}>{this.props.guestName}
							</li>
							<input type='submit' id='guestItemOpen' value='+' onClick={() => this.openDialog()}/>
						</div>

						<div className="dialogbox2" id={this.props.Key}>
							<dialog open>
									<div id="closeWindow">
										<input type='submit' className= "button2" id="closeButton" value='X' onClick={() => this.closeDialog()}/>
									</div>
									<div id='guestBoxInfo'>
										<h1>{this.props.guestName}</h1>
										<label><b>Guest ID:</b> {this.props.guestId}</label>
										<form id="formGuest" onSubmit={this.handleSubmit}>
											<p>
												<label>Name</label>
												<input type="text" className="textFormBox"
													value={this.state.name} onChange={this.changeName} disabled/>
											</p>
											<p>
												<label>Email</label>
												<input type="email" className="textFormBox"
													value={this.state.email} onChange={this.changeEmail} disabled/>
											</p>
											<p>
												<label>Phone</label>
												<input type="text" className="textFormBox"
													value={this.state.phone} onChange={this.changePhone} disabled/>
											</p>
											<p>
												<label>Address</label>
												<input type="text" className="textFormBox"
													value={this.state.address} onChange={this.changeAddress} disabled/>
											</p>
											<input type='submit' className='button' id='guestButtons' value='Save'/>
										</form>
										<input type='submit' className='button' id='guestButtons' value='Edit' onClick={() => this.enableForm()}/>
										<input type='submit' className='button' id='guestButtons' value='Delete' onClick={() => this.deleteForm()}/>
										<input type='submit' className='button' id='guestButtons' value='Cancel' onClick={() => this.cancelForm()}/>
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

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {itemList:[]};
		// Just here for testing
		this.state.itemList.push(
			<Table
				name="table1"
				xCoordinate='50'
				yCoordinate='50'
				size="100"/>);
		this.state.itemList.push(
			<Table
				name="table1"
				xCoordinate='200'
				yCoordinate='250'
				size="100"/>);


		this.createGrid = this.createGrid.bind(this);
	}

	createGrid(height, width) {
		let table = [];

		// Outer loop to create parent
		for (let i = 0; i < Math.floor(height/50); i++) {
			let children = [];
			//Inner loop to create children
			for (let j = 0; j < Math.floor(width/50); j++) {
				children.push(<td className="layoutSquare"/>);
			}
			if (width % 50 !== 0) {
				children.push(<td className="layoutSquare lastCol"  style={{width:(width % 50)}}/>);
			}
			//Create the parent and add the children
			table.push(<tr className="layoutRow">{children}</tr>);
		}

		if (height % 50 !== 0) {
			let children = [];
			//Inner loop to create children
			for (let j = 0; j < Math.floor(width/50); j++) {
				children.push(<td className="layoutSquare lastRow" style={{height:(height % 50)}} />);
			}
			if (width % 50 !== 0) {
				children.push(<td className="layoutSquare lastRow lastCol"  style={
					{width:(width % 50), height:(height % 50)}}/>);
			}
			//Create the parent and add the children
			table.push(<tr className="layoutRow lastRow">{children}</tr>);
		}
		return table
	}

	render() {
		return (
		    <div id="layoutWrapper" style={{width: this.props.width, height:this.props.height}}>
			    <table id="Layout" cellSpacing="0" >
				    {this.createGrid(this.props.height, this.props.width)}
						{this.state.itemList}
			    </table>
				</div>
		);
	}
}



class ChartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			xCoordinate: parseInt(this.props.xCoordinate),
			yCoordinate: parseInt(this.props.yCoordinate),
			size: parseInt(this.props.size)
		};

		this.changeLocation = this.changeLocation.bind(this);
		this.chooseItem = this.chooseItem.bind(this);
		this.chooseSize = this.chooseSize.bind(this);
	}

	changeLocation() {
	}

	chooseItem() {
	}

	chooseSize() {
	}
}

class Table extends ChartItem {
	constructor(props) {
		super(props);
		this.state = {
			seats: parseInt(this.props.seats),
			guests: this.props.guests,
		};

		this.seatGuest = this.seatGuest.bind(this);
	}

	seatGuest() {
	}

	render() {
		return (
			<div className="table" style={{
				width:parseInt(this.props.size),
				height:parseInt(this.props.size),
				top:parseInt(this.props.yCoordinate),
				left:parseInt(this.props.xCoordinate)
				}}/>
		);
	}
}

export default withRouter(CreateGuest);
