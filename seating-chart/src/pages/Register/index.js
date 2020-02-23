import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom"
import {registerPlanner} from "../../services/Validator";
import {User} from "../../services/User";

class RegisterBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {name: '', user:'', pass:'', repass:'', error:'plannerError'};

		this.changeName = this.changeName.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.changePass = this.changePass.bind(this);
		this.changeRepass = this.changeRepass.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeName(event) {
			this.setState({name: event.target.value});
	}

	changeUser(event) {
			this.setState({user: event.target.value});
	}

	changePass(event) {
			this.setState({pass: event.target.value});
	}

	changeRepass(event) {
			this.setState({repass: event.target.value});
	}


	handleSubmit(event) {
		event.preventDefault();
		if (registerPlanner(this.state.name, this.state.user, this.state.pass, this.state.repass)) {
			let user = new User(this.state.user);
			if (this.props.storage.setUser(user)) {
				this.props.history.push('/planner');
			} else {
					alert("Cannot set " + this.state.user + " as Current User");
			}
		} else {
				this.setState({error: 'passError'});
		}
	}

	render() {

		return (
			<div className='userMain' id = 'wrapperbox'>
				<form id='registerBox' onSubmit={this.handleSubmit}>
        			<h1 id='registerTitle'>Account Information</h1>
        			<div id='inputs'>
          				<input type='text' className='textBox' id='firstName' placeholder='Full Name'
												 value ={this.state.name} onChange={this.changeName} />
          				<input type='text' className='textBox' id='e-mail' placeholder='E-mail Address'
												 value={this.state.user} onChange={ this.changeUser}/>
          				<input type='password' className='textBox' id='password' placeholder='Password'
												 value ={this.state.pass} onChange={this.changePass}/>
          				<input type='password' className='textBox' id='re_password' placeholder='Re-Enter Password'
												value ={this.state.repass} onChange={this.changeRepass}/>
									<div className='loginError' id={this.state.error}>
										Invalid Registration
									</div>
					</div>
        			<input type='submit' className='button' id='newUser' value='Create Account' />
				</form>
			</div>
		);

	}
}

export default withRouter(RegisterBox);
