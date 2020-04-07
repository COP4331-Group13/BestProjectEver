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

                        // List of Guest items
						listItems: [],

                        // List of Chart items
                        itemList: this.props.storage.getItems()[1],
						placedItemList: [],
						clicked: 'false',
						search: '',
						curEvent:this.props.storage.getEvent(),
						// default values, almost immediately changed
						layoutWidth: 900,
						layoutHeight: 750
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

                        // List of Guest Items
						listItems: [],

                        // List of Chart Items
                        itemList: this.props.storage.getItems()[1],
						placedItemList: [],
						clicked: 'false',
						curEvent:this.props.storage.getEvent(),
						search: '',
						// default values, almost immediately changed
						layoutWidth: 900,
						layoutHeight: 750
				};
		}

		for (let i = 0; i < this.state.itemList.length; i++) {
			let newItem;
			if (this.state.itemList[i].name.includes("Table")) {
				newItem = <Table item={this.state.itemList[i]}/>
			} else {
				newItem = <ChartItem item={this.state.itemList[i]} />
			}
			this.state.placedItemList.push(newItem);
		}
		this.state.layoutWidth = this.state.curEvent.layout_width;
		this.state.layoutHeight = this.state.curEvent.layout_length;

		this.props.storage.setGuest(undefined);
		this.openGuestDialog = this.openGuestDialog.bind(this);
		this.openItemDialog = this.openItemDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
		this.updateGuests = this.updateGuests.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}

	openItemDialog() {
		let dialog = document.getElementsByClassName('itemDialog');
		dialog[0].id="openDialog";
	}

	openGuestDialog() {
		let dialog = document.getElementsByClassName('guestDialog');
		dialog[0].id="openDialog";
	}

	changeSearch(event) {
		this.setState({search: event.target.value});
	}

	updateGuests() {
        let listLength = this.state.guestList.length;
        this.setState({guestList: this.props.storage.getGuests()});
        this.setState(prevState => ({
            listItems: [...prevState.listItems, <GuestItem
                Key={this.state.guestList[listLength - 1].guestId}
                Guest={this.state.guestList[listLength - 1]}
                guestName={this.state.guestList[listLength - 1].name}
                guestEmail={this.state.guestList[listLength - 1].userName}
                guestPhone={this.state.guestList[listLength - 1].phoneNumber}
                guestAddress={this.state.guestList[listLength - 1].address}
                guestId={this.state.guestList[listLength - 1].guestId}
                storage={this.props.storage}
                history={this.props.history}
            />]
        }));
    }

    updateItems() {
        let listLength = this.state.itemList.length;
        this.setState({itemList: this.props.storage.getItems()});
        let newItem;
        if (this.state.itemList[listLength - 1].name.includes("Table")) {
        	newItem = <Table item={this.state.itemList[listLength - 1]} />
		} else {
			newItem = <ChartItem item={this.state.itemList[listLength - 1]} />
		}
		this.setState(prevState => ({
			listItems: [...prevState.listItems, newItem]}));
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
						<Layout height={this.state.layoutHeight} width={this.state.layoutWidth}
                                storage={this.props.storage} itemList={this.state.placedItemList}/>
					</div>
					<div id="chartItems">
						<input type='submit' className='button' id='add_table' value='Add Table' onClick={() => this.openItemDialog()}/>
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
						<input type='submit' className='button' id='add_guest' value='Add Guest' onClick={() => this.openGuestDialog()}/>
					</div>
					<div id="properties">
						<div id="itemProperties">
							<p><label>Item properties</label></p>
						</div>
						<div id="roomProperties">
							<p><label><b>Room properties:</b></label></p>
							<p><label>Length: {Math.floor(parseInt(this.state.curEvent.layout_length) / 15)}ft.</label></p>
							<p><label>Width: {Math.floor(parseInt(this.state.curEvent.layout_width) / 15)}ft.</label></p>
						</div>

					</div>
				</div>
				<GuestDialog storage={this.props.storage} updateGuests={this.updateGuests} />
				<ItemDialog storage={this.props.storage} updateItems={this.updateItems} />
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
                        {this.props.itemList}
			    </table>

				</div>
		);
	}
}

export class ChartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			xCoordinate: parseInt(this.props.item.xCoordinate),
			yCoordinate: parseInt(this.props.item.yCoordinate),
			height: parseInt(this.props.item.height),
            width: parseInt(this.props.item.width)
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

export class Table extends ChartItem {
	constructor(props) {
		super(props);
		this.state = {
			seats: parseInt(this.props.item.seats),
			guests: this.props.item.guests,
		};

		this.seatGuest = this.seatGuest.bind(this);
	}

	seatGuest() {
	}

	render() {
		return (
			<div className="table" style={{
				width:parseInt(this.props.item.width),
				height:parseInt(this.props.item.height),
				top:parseInt(this.props.item.yCoordinate),
				left:parseInt(this.props.item.xCoordinate)
			}}/>
		);
	}
}

class GuestDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: '',
			address: '',
		};

		this.handleSubmitGuest = this.handleSubmitGuest.bind(this);
		this.closeGuestDialog = this.closeGuestDialog.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
		this.changePhone = this.changePhone.bind(this);
	}

	closeGuestDialog() {
		let dialog = document.getElementsByClassName('guestDialog');
		dialog[0].id="dialogbox";
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

	handleSubmitGuest(event) {
		event.preventDefault();
		let added = this.props.storage.addGuest(this.state);
		if (added[0]) {
            this.props.updateGuests();
			this.closeGuestDialog();

		} else {
			this.setState({error: 'guestError'});
			this.setState({errorMessage: added[1]});
		}
	}

	render() {
		return (
			<div className="guestDialog" id="dialogbox">
				<dialog open>
					<div id="closeWindow">
						<input type='submit' className="button2" id="closeButton" value='X' onClick={() => this.closeGuestDialog()}/>
					</div>
					<h1>Add a Guest</h1>
					<form onSubmit={this.handleSubmitGuest}>
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
							<input type='submit' className='button' id='add_guest' value='Submit' />
						</div>
					</form>
				</dialog>
			</div>
		);
	}
}

class ItemDialog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			height: '',
			width: '',
			numSeats: ''
		};

		this.handleSubmitItem = this.handleSubmitItem.bind(this);
		this.closeItemDialog = this.closeItemDialog.bind(this);
		this.changeLength = this.changeLength.bind(this);
		this.changeWidth = this.changeWidth.bind(this);
		this.changeNumSeats = this.changeNumSeats.bind(this);
	}

	changeLength(event) {
		this.setState({height: event.target.value});
	}

	changeWidth(event) {
		this.setState({width: event.target.value});
	}

	changeNumSeats(event) {
		this.setState({numSeats: event.target.value});
	}

	closeItemDialog() {
		let dialog = document.getElementsByClassName('itemDialog');
		dialog[0].id="dialogbox";
	}

	handleSubmitItem(event) {
		event.preventDefault();
        event.preventDefault();
        let added = this.props.storage.addTable(this.state);
        if (added[0]) {
            this.props.updateItems();
            this.closeItemDialog();

        } else {
            this.setState({error: 'guestError'});
            this.setState({errorMessage: added[1]});
        }
	}

	render() {
		return (
			<div className="itemDialog" id="dialogbox">
				<dialog open>
					<div id="closeWindow">
						<input type='submit' className="button2" id="closeButton" value='X' onClick={() => this.closeItemDialog()}/>
					</div>
					<h1>Add a Table</h1>
					<form onSubmit={this.handleSubmitItem}>
						<input type="number" className="textBox" id="length"
							   placeholder="Length" value ={this.state.length} onChange={this.changeLength} required/>ft.
						<input type="number" className="textBox" id="width"
							   placeholder="Width" value ={this.state.email} onChange={this.changeWidth} required/>ft.
						<input type="number" className="textBox" id="width"
							   placeholder="Number of Seats" value ={this.state.email} onChange={this.changeNumSeats} required/>
						<div className='eventError' id={this.state.error} >
							{this.state.errorMessage}
						</div>
						<div id="buttonbox">
							<input type='submit' className='button' id='add_table' value='Submit'/>
						</div>
					</form>
				</dialog>
			</div>
		);
	}
}


export default withRouter(CreateGuest);
