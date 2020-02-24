import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom"
import {registerPlanner} from "../../services/Validator";

class RegisterBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {name: '', user:'', pass:'', repass:'', error:'plannerError', errorMessage:"Invalid Registration"};

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
		let registered = registerPlanner(this.state, this.props.storage);
		if (registered[0]) {
			this.props.history.push('/planner');
		} else {
			this.setState({error: 'loginError'});
			this.setState({errorMessage: registered[1]});
		}
		console.log(registered[0]);
	}

	render() {

		return (
			<div className='userMain' id = 'wrapperbox'>
				<form id='registerBox' onSubmit={this.handleSubmit}>
        			<h1 id='registerTitle'>Account Information</h1>
        			<div id='inputs'>
          				<input type='text' className='textBox' id='firstName' required placeholder='Full Name'
												 value ={this.state.name} onChange={this.changeName}/>
          				<input type='text' className='textBox' id='e-mail' required placeholder='E-mail Address'
												 value={this.state.user} onChange={ this.changeUser}/>
          				<input type='password' className='textBox' id='password' required placeholder='Password'
												 value ={this.state.pass} onChange={this.changePass}/>
          				<input type='password' className='textBox' id='re_password' required placeholder='Re-Enter Password'
												value ={this.state.repass} onChange={this.changeRepass}/>
									<div className='loginError' id={this.state.error} >
										{this.state.errorMessage}
									</div>
					</div>
        			<input type='submit' className='button' id='newUser' value='Create Account' />
				</form>
			</div>
		);

	}
}

export default withRouter(RegisterBox);
