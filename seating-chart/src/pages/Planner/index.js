import React from 'react';
import '../../SeatPlanner.css';

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clicked: 'false'};

		
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

			<Modal
				visible={this.state.visible}
				width="400"
				height="300"
				effect="fadeInUp"
				onClickAway = {() => this.closeDialog() }
			>
				<div>
					<h1>Add a Guest</h1>
					<a href="javascript:void(0);" onClick={() => this.closeDialog()}>Close</a>
				</div>
			</Modal>
		);

	}
}

export default function Planner() {
	return <CreateGuest />
}
