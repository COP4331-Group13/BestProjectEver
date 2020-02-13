import React from 'react';
import '../../SeatPlanner.css';

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clicked: 'false'};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		
	}

	render() {
		return (
			<div id="wrapperbox">
				<div id = "welcome">
					<h1>Welcome to the Planner Page</h1>
					<h1>We are currently working on this page...</h1>
				</div>
				<div id = "buttonbox">
					<input type='submit' className='button' id='add_guest' value='Add Guest' />
				</div>
			</div>
		);

	}
}

export default function Planner() {
	return <CreateGuest />
}
