import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom"


class RegisterBox extends React.Component {

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push('/planner');
	}

	render() {

		return (
			<div className='userMain' id = 'wrapperbox'>
				<form id='registerBox' onSubmit={this.handleSubmit}>
        			<h1 id='registerTitle'>Account Information</h1>
        			<div id='inputs'>
          				<input type='text' className='textBox' id='firstName' placeholder='First Name' />
          				<input type='text' className='textBox' id='lastName' placeholder='Last Name' />
          				<input type='text' className='textBox' id='e-mail' placeholder='E-mail Address' />
          				<input type='password' className='textBox' id='password' placeholder='Password' />
          				<input type='password' className='textBox' id='re_password' placeholder='Re-Enter Password' />
					</div>
        			<input type='submit' className='button' id='newUser' value='Create Account' />
				</form>
			</div>
		);

	}
}

export default withRouter(RegisterBox);