import React from 'react';
import '../../SeatPlanner.css';


class RegisterBox extends React.Component {


	render() {

		return (
			<div className='userMain' id = 'wrapperbox'>
				<form id='registerBox'>
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

export default function Register() {
	return <RegisterBox />
}