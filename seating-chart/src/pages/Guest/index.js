import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {Navigation} from '../../services/navigation.js';

export class GuestView extends React.Component {

    constructor(props) {
      super(props);

      this.props.storage.getSingleEvent();

      this.state = {
        name: '',
        email: '',
        phone: '',
        address: '',
        curUser: this.props.storage.getUser(),
        curEvent: this.props.storage.getEvent(),
        curGroup: this.props.storage.getGuestGroup(),
        itemList: this.props.storage.getItems()[1],
        placedItemList: [],
        layoutWidth: 900,
        layoutHeight: 750
      };

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

      this.handleLogout = this.handleLogout.bind(this);
      this.changeName = this.changeName.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changeAddress = this.changeAddress.bind(this);
      this.changePhone = this.changePhone.bind(this);
      this.openDialog = this.openDialog.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.storage.clear();
        this.props.history.push("/");
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
      this.setState({
        name: this.state.curUser.name,
        email: this.state.curUser.userName,
        phone: this.state.curUser.phoneNumber,
        address: this.state.curUser.address
      });
			document.getElementById("edit_guest").style.display = 'block';
		}

		closeDialog() {
			document.getElementById("edit_guest").style.display = 'none';
		}

    handleSubmit(event) {
			event.preventDefault();
			if (window.confirm("Do you want to save changes?") === true) {
					let updated = this.props.storage.updateGuestUser(this.state);
					if (updated) {
						alert("Account info updated!");
						this.closeDialog();
						window.location.reload(true); // for now page reloads to get the updated info.
					}
			} else {
				// do nothing
			}
		}

    render() {
        return(
            <div id = "wrapperbox">
                <div id = "welcome">
                  <div className='button' id='logout' onClick={this.handleLogout}>
                      Logout
                  </div>
                  <h1>Welcome, {this.state.curUser.name}!</h1>
                </div>

                <div id= 'chartGuest'>
                  <div id="seatingChartGuest">
                  <Layout height={this.state.layoutHeight} width={this.state.layoutWidth}
                                      storage={this.props.storage} itemList={this.state.placedItemList}/>
        					</div>
                </div>

                <div id= 'guestInfo'>
                  <div className='box' id='guestBox'>
                    <h3>Account Information</h3>
                    <div id= 'guestInformation'>
                      <p>
                        <b>Guest ID: </b>{this.state.curUser.guestId}
                        <input type='submit' className='button2' id='edit' value='EDIT' onClick={() => this.openDialog()}/>
                      </p>
                      <p><b>Name: </b>{this.state.curUser.name}</p>
                      <p><b>Email: </b>{this.state.curUser.userName}</p>
                      <p><b>Phone Number: </b>{this.state.curUser.phoneNumber}</p>
                      <p><b>Address: </b>{this.state.curUser.address}</p>
                    </div>
                  </div>
                  <div className='box' id= 'preferencesBox'>
                    <h3>Preferences</h3>
                    <div id='guestPreferences'>
                      <input type="text" className="textBox"
                              id="Spouse" placeholder="Spouse"
                              value ={this.state.spouse}
                              onChange={this.changespouse} required />
                      <input type="text" className="textBox"
                             id="exception" placeholder="exception"
                             value ={this.state.exception}
                             onChange={this.changeException} required />
                    </div>
                  </div>
                  <div className='box' id= 'groupsBox'>
                    <h3>Groups</h3>
                    <div id='guestGroups'>
                      <p><b>Your Event Group: </b>{this.state.curGroup[1]}</p>
                    </div>
                  </div>
                  <div className='box' id='eventBox'>
                    <h3>Event Information</h3>
                    <div id= 'eventInformation'>
                      <p><b>Event Name: </b>{this.state.curEvent.name}</p>
                      <p><b>Event Address: </b>{this.state.curEvent.address}</p>
                      <p><b>Event Date/Time: </b>{this.state.curEvent.eventDate}</p>
                    </div>
                  </div>
                </div>

                <div className="dialogbox2" id="edit_guest">
    							<dialog open>
    									<div id="closeWindow">
    										<input type='submit' className= "button2" id="closeButton" value='X' onClick={() => this.closeDialog()}/>
    									</div>
    										<h1>Edit Account Information:</h1>
    										<form id="formGuest" onSubmit={this.handleSubmit}>
                          <p>
                            <label>Name</label>
                            <input type="text" className="textFormBox"
                              value={this.state.name} onChange={this.changeName}/>
                          </p>
                          <p>
                            <label>Email</label>
                            <input type="email" className="textFormBox"
                              value={this.state.email} onChange={this.changeEmail}/>
                          </p>
                          <p>
                            <label>Phone</label>
                            <input type="text" className="textFormBox"
                              value={this.state.phone} onChange={this.changePhone}/>
                          </p>
                          <p>
                            <label>Address</label>
                            <input type="text" className="textFormBox"
                              value={this.state.address} onChange={this.changeAddress}/>
                          </p>
                          <input type='submit' className='button' id='button' value='Save'/>
    										</form>
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

class ChartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			xCoordinate: parseInt(this.props.item.xCoordinate),
			yCoordinate: parseInt(this.props.item.yCoordinate),
			height: parseInt(this.props.item.height),
      width: parseInt(this.props.item.width)
		};
	}
}

class Table extends ChartItem {
        constructor(props) {
                super(props);
                this.state = {
                        seats: parseInt(this.props.item.seats),
                        guests: this.props.item.guests,
                };
                this.openDialog = this.openDialog.bind(this);
        				this.closeDialog = this.closeDialog.bind(this);
        }

        openDialog() {
    			document.getElementById("seatDialogBox").style.display = 'block';
    		}

        closeDialog() {
    			document.getElementById("seatDialogBox").style.display = 'none';
    		}

        render() {
                return (
                        <div className="table" style={{
                                width:parseInt(this.props.item.width),
                                height:parseInt(this.props.item.height),
                                top:parseInt(this.props.item.yCoordinate),
                                left:parseInt(this.props.item.xCoordinate)
                        }}>
                         <input id="seat_guest" class="button" type="submit" value="+" onClick={() => this.openDialog()}/>
                          <div className="dialogbox2" id="seatDialogBox">
                                  <dialog open>
                                          <div id="closeWindow">
                                                  <input type='submit' className="button2" id="closeButton" value='X' onClick={() => this.closeDialog()}/>
                                          </div>
                                          <h1>Guests</h1>
                                          {this.state.guests}
                                  </dialog>
                          </div>
                        </div>
                );
        }
}

export default withRouter(GuestView);
