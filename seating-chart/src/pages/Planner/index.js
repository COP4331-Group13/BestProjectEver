import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);

		this.props.storage.setGuest(undefined);
		this.openGuestDialog = this.openGuestDialog.bind(this);
		this.openItemDialog = this.openItemDialog.bind(this);
		this.saveLayout = this.saveLayout.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
		this.updateGuests = this.updateGuests.bind(this);
		this.removeGuest = this.removeGuest.bind(this);
		this.updateItems = this.updateItems.bind(this);

		let gotGuests = this.props.storage.getGuests();
		if (gotGuests[0]) {
				this.state = {
						guestList: gotGuests[1],

                        // List of Guest items
						listItems: [],
						displayedListItems: [],
                        // List of Chart items
						itemList: [],
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
                                        removeGuest={this.removeGuest}
								/>);
				}
		} else {
				this.state = {
						guestList: [],

                        // List of Guest Items
						listItems: [],
						displayedListItems: [],
                        // List of Chart Items
						itemList: [],
						placedItemList: [],
						clicked: 'false',
						curEvent:this.props.storage.getEvent(),
						search: '',
						// default values, almost immediately changed
						layoutWidth: 900,
						layoutHeight: 750
				};
		}

		let gotItems = this.props.storage.getItems();
		if (gotItems[0]) {
			this.state.itemList = gotItems[1];
		}

		for (let i = 0; i < this.state.itemList.length; i++) {
			let newItem;
			console.log(this.state.itemList.length);
			if (this.state.itemList[i].name.includes("Table")) {
				newItem = <Table item={this.state.itemList[i]} storage={this.props.storage} />
			} else {
				newItem = <ChartItem item={this.state.itemList[i]} storage={this.props.storage} />
			}
			this.state.placedItemList.push(newItem);
		}
		this.state.displayedListItems = this.state.listItems;
		this.state.layoutWidth = this.state.curEvent.layout_width;
		this.state.layoutHeight = this.state.curEvent.layout_length;

	}

	openItemDialog() {
		let dialog = document.getElementsByClassName('itemDialog');
		dialog[0].id="openDialog";
	}

	openGuestDialog() {
		let dialog = document.getElementsByClassName('guestDialog');
		dialog[0].id="openDialog";
	}

	saveLayout(event) {
		event.preventDefault();
		if (window.confirm("Do you want to save changes?") === true) {
			  let save = this.props.storage.saveLayout();
				if (save) {
					alert("Layout was successfully saved!");
				}
		} else {
			// do nothing
		}
	}

	changeSearch(event) {
		this.setState({search: event.target.value}, () => {
			let filtered = this.state.listItems.filter(
				guest => guest.props.Guest.name.toLowerCase().includes(this.state.search.toLowerCase())
			);
			this.setState({displayedListItems: filtered});
		});
	}

	updateGuests() {

        this.setState({guestList: this.props.storage.getGuests()[1]}, () => {
			let guest = this.props.storage.lastAddedGuest;
			this.setState(prevState => ({
				listItems: [...prevState.listItems, <GuestItem
					Key={guest.guestId}
					Guest={guest}
					guestName={guest.name}
					guestEmail={guest.userName}
					guestPhone={guest.phoneNumber}
					guestAddress={guest.address}
					guestId={guest.guestId}
					storage={this.props.storage}
					history={this.props.history}
                    removeGuest={this.removeGuest}
				/>].sort(function (guest1, guest2) {
					return guest1.props.Guest.name.localeCompare(guest2.props.Guest.name);
				})
			}), () => {
				let filtered = this.state.listItems.filter(
					guest => guest.props.Guest.name.toLowerCase().includes(this.state.search.toLowerCase())
				);
				this.setState({displayedListItems: filtered});
			});
		});
    }

    removeGuest(removedGuestKey) {
        this.setState({guestList: this.props.storage.getGuests()[1]}, () => {

            let filtered = this.state.listItems;
            for (let i = 0; i < filtered.length; i++) {
            	if (filtered[i].props.Key === removedGuestKey) {
            		filtered.splice(i, 1);
            		break;
				}
			}

            this.setState({listItems: filtered}, () => {
				let displayFiltered = this.state.listItems.filter(
					guest => guest.props.Guest.name.toLowerCase().includes(this.state.search.toLowerCase())
				);
				this.setState({displayedListItems: displayFiltered});
			});
        })
    }

    updateItems() {

        this.setState({itemList: this.props.storage.getItems()[1]}, () => {
			let listLength = this.state.itemList.length;
			let newItem;
			if (this.state.itemList[listLength - 1].name.includes("Table")) {
				newItem = <Table item={this.state.itemList[listLength - 1]} storage = {this.props.storage} />
			} else {
				newItem = <ChartItem item={this.state.itemList[listLength - 1]} storage = {this.props.storage}/>
			}
			this.setState(prevState => ({
				placedItemList: [...prevState.placedItemList, newItem]}));
		});
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
						<input type='submit' className='button' id='save_layout' value='Save Layout' onClick={this.saveLayout}/>
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
						<ul id="guestList">{this.state.displayedListItems}</ul>
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
							<p><label>Length: {Math.floor(parseInt(this.state.curEvent.layout_length) / 10)}ft.</label></p>
							<p><label>Width: {Math.floor(parseInt(this.state.curEvent.layout_width) / 10)}ft.</label></p>
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
						address: this.props.guestAddress,
                        guestId: this.props.Guest.guestId
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
						this.props.removeGuest(this.state.guestId);
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
				inputForm[i].id = "disabled";
			}
		}

		enableForm() {
			let inputForm = document.getElementsByClassName('textFormBox');
			for (let i = 0; i < inputForm.length; i++) {
    		inputForm[i].disabled = false;
    		inputForm[i].id = "enabled";
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
                            <li key={this.props.Key} className='guestItem' value={this.props.guestName}>
                                {this.props.guestName}
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
												<input type="text" className="textFormBox" id="disabled"
													value={this.state.name} onChange={this.changeName} disabled/>
											</p>
											<p>
												<label>Email</label>
												<input type="email" className="textFormBox" id="disabled"
													value={this.state.email} onChange={this.changeEmail} disabled/>
											</p>
											<p>
												<label>Phone</label>
												<input type="text" className="textFormBox" id="disabled"
													value={this.state.phone} onChange={this.changePhone} disabled/>
											</p>
											<p>
												<label>Address</label>
												<input type="text" className="textFormBox" id="disabled"
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
					xCoordinate: parseInt(this.props.item.xCoordinate),
					yCoordinate: parseInt(this.props.item.yCoordinate),
                    seats: parseInt(this.props.item.seats),
                    guests: this.props.item.guests,
					height: parseInt(this.props.item.height),
					width: parseInt(this.props.item.width),
                    tableId: this.props.item.tableId,
					curEvent:this.props.storage.getEvent(),
                };

                this.seatGuest = this.seatGuest.bind(this);
                this.dragMouseDown = this.dragMouseDown.bind(this);
        }

        seatGuest() {
        	this.props.storage.setCurTable(this.state.tableId);
			this.setState({curTable:this.props.storage.getCurTable()});
			let div = document.getElementsByClassName(this.state.tableId)[0];
            let dialog = div.getElementsByClassName('seatDialog');
            dialog[0].id="openDialog";
        }

        dragMouseDown(event) {
        	event.preventDefault();
        	let elmnt = document.getElementById(this.state.tableId);
        	let posX1 = this.state.xCoordinate,
				posY1 = this.state.yCoordinate,
				posX = event.clientX, posY = event.clientY;

			let newX = elmnt.offsetLeft - posX1,
				newY = elmnt.offsetTop - posY1;

			document.onmousemove = (event) => {

				event.preventDefault();
				posX1 = posX - event.clientX;
				posY1 = posY - event.clientY;
				posX = event.clientX;
				posY = event.clientY;

				newX = elmnt.offsetLeft - posX1;
				if (newX < 0) {
					newX = 0;
				} else if (newX > (this.state.curEvent.layout_width - this.state.width)) {
						newX = this.state.curEvent.layout_width - this.state.width;
				}
				elmnt.style.left = newX + "px";


				newY = elmnt.offsetTop - posY1;
				if (newY < 0) {
					newY = 0;
				} else if (newY > (this.state.curEvent.layout_length - this.state.height)) {
					newY = this.state.curEvent.layout_length - this.state.height;
				}
				elmnt.style.top = newY + "px";

				elmnt.scrollIntoView({block:"nearest", inline:"nearest"});

			};

			document.onmouseup = () => {

				// stop moving when mouse button is released:
				document.onmouseup = null;
				document.onmousemove = null;
				if (posX1 !== this.state.xCoordinate && posY1 !== this.state.yCoordinate) {
					this.setState({xCoordinate: newX, yCoordinate: newY}, () => {
						this.props.item.xCoordinate = this.state.xCoordinate;
						this.props.item.yCoordinate = this.state.yCoordinate;
						this.props.storage.updateTableLocation(this.state.tableId, newX, newY);
					});
				} else if (posX1 === this.state.xCoordinate && posY1 !== this.state.yCoordinate) {
					this.setState({yCoordinate: newY}, () => {
						this.props.item.yCoordinate = this.state.yCoordinate;
						this.props.storage.updateTableLocation(this.state.tableId, this.state.xCoordinate, newY);
					});
				} else if (posX1 !== this.state.xCoordinate && posY1 === this.state.yCoordinate) {
					this.setState({xCoordinate: newX}, () => {
						this.props.item.xCoordinate = this.state.xCoordinate;
						this.props.storage.updateTableLocation(this.state.tableId, newX, this.state.yCoordinate);
					});
				}
			}

		}

        render() {
                return (
					<div className={this.state.tableId}>
                    	<div className="table" id = {this.state.tableId} style={{
                        	width:parseInt(this.props.item.width),
                        	height:parseInt(this.props.item.height),
                        	top:parseInt(this.state.yCoordinate) + "px",
                        	left:parseInt(this.state.xCoordinate) + "px"
                    	}} onMouseDown={this.dragMouseDown}>
                        	<input id="seat_guest" type="submit" value="+" onClick={this.seatGuest}/>

						</div>
						<SeatDialog storage={this.props.storage} curTable={this.props.item}/>
                    </div>
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
		this.setState({height:'', width:'', numSeats:''}, () => {
			let dialog = document.getElementsByClassName('itemDialog');
			dialog[0].id="dialogbox";
		});
	}

	handleSubmitItem(event) {
		event.preventDefault();
        event.preventDefault();
        let added = this.props.storage.addTable(this.state);
        if (added[0]) {
            this.closeItemDialog();
			this.props.updateItems();

        } else {
            this.setState({error: 'tableError'});
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
							   placeholder="Height" value ={this.state.height} onChange={this.changeLength} required/>ft.
						<input type="number" className="textBox" id="width"
							   placeholder="Width" value ={this.state.width} onChange={this.changeWidth} required/>ft.
						<input type="number" className="textBox" id="width"
							   placeholder="Number of Seats" value ={this.state.numSeats} onChange={this.changeNumSeats} required/>
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


class SeatDialog extends React.Component {
        constructor(props) {
                super(props);

                this.state = {
                    numSeats: this.props.curTable.numSeats,
					guestList: this.props.storage.getGuestList(),
					curTable: this.props.curTable,
					selectedGuest: '', // guest_pin
					usableGuests: [],
					seatedGuests: [],
					seatedGuestItems: []
                };
                this.state.seatedGuests = this.props.curTable.guests;
				let list = this.state.guestList.length > 0
				&& this.state.guestList.map((item) => {
					return (
						<option value={item.guestId}>{item.name}</option>
					)
				}, this);
				this.state.usableGuests = list;
                this.handleSubmitSeats = this.handleSubmitSeats.bind(this);
                this.closeSeatDialog = this.closeSeatDialog.bind(this);
                this.selectGuest = this.selectGuest.bind(this);
                this.handleAddGuest = this.handleAddGuest.bind(this);
                this.updateUsableGuests = this.updateUsableGuests.bind(this);
        }

				selectGuest(event) {
					this.setState({selectedGuest: event.currentTarget.value});
				}

			 	handleAddGuest(event) {
						event.preventDefault();
						console.log(this.state.selectedGuest);
						if (this.state.selectedGuest === ''||
							this.state.selectedGuest === 'Choose a Guest') {
							alert("Please select a guest");
							return;
						}
						let added = this.props.storage.addGuestTable(this.props.curTable, this.state.selectedGuest);
						if (added[0]) {
							console.log(added[1]);
							this.setState({seatedGuests:added[1]}, () => {

							})
						} else {
							alert(added[1]);
						}
				}

        closeSeatDialog(event) {
        	event.preventDefault();
        	this.props.storage.resetCurTable();
			let div = document.getElementsByClassName(this.props.curTable.tableId)[0];
			let dialog = div.getElementsByClassName('seatDialog');
			dialog[0].id="dialogbox";
        }

        updateUsableGuests() {

			let list = this.props.storage.getGuests()[1];
			if (list.length !== this.state.guestList.length) {
				this.setState({guestList: list}, () => {
					let newList = this.state.guestList.map((item) => {
						return (
							<option value={item.guestId}>{item.name}</option>
						)
					}, this);
					this.setState({usableGuests: newList});
				});
			}
		}


        handleSubmitSeats(event) {
                event.preventDefault();
        }


        render() {


                return (
                        <div className="seatDialog" id="dialogbox">
                                <dialog open>
									<div id="closeWindow">
										<input type='submit' className="button2" id="closeButton" value='X' onClick={this.closeSeatDialog}/>
									</div>
									<h1>{this.props.curTable.name}</h1>
									<p>Guests Seated Here: </p>					
									<label>Select guest to add to this table: </label>
									<select id="selectGuest" onClick={this.updateUsableGuests} onChange={this.selectGuest}>
										<option> Choose a Guest </option>
										{this.state.usableGuests}
									</select>
									<div id="buttonbox">
										<input type='submit' className='button' id='add_guest_table' value='Add Guest' onClick={this.handleAddGuest}/>
									</div>
                                </dialog>
                        </div>
                );
        }

}

export default withRouter(CreateGuest);
