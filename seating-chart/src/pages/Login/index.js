import React from 'react';
import '../../SeatPlanner.css';


class LoginBox extends React.Component {

    render() {

        return (
            <div id = "wrapperbox">
                <div id = "welcome">
                    <h1>Welcome to Best Fit Seating</h1>
                    <h1>Are you here as an Event Planner or as a Guest?</h1>
                </div>
                <div id = "loginbox">
                    <PlannerLogin />
                    <GuestLogin />
                </div>
            </div>
        );

    }
}

class GuestLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {gID: '', clicked: 'false'};

        this.changeGID = this.changeGID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeGID(event) {
        this.setState({gID: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.gID !== '') {
            document.getElementById('email').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('guestID').value = '';
            window.location.href = "guest";
        } else {
            document.getElementById('guestError').style.color = 'red';
        }
    }

    render () {

        return (
            <div className='box' id= 'guestLogin'>
                <h2>Login as Guest</h2>
                <form onSubmit= {this.handleSubmit}>
                    <div className='infoBox'>
                        <input type= 'text' className='textBox' id='guestID'
                               placeholder='Unique Guest ID' onChange={this.changeGID} />
                        <div className='loginError' id='guestError'>
                            Invalid Guest ID
                        </div>
                    </div>
                    <input type='submit' className='button' id='guest' value='CONTINUE' />
                </form>
            </div>
        );

    }
}

class PlannerLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user:'', pass:'', clicked: 'false'};

        this.changeUser = this.changeUser.bind(this);
        this.changePass = this.changePass.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeUser(event) {
        this.setState({user: event.target.value});
    }

    changePass(event) {
        this.setState({pass: event.target.value});
    }

    handleRegister(event) {
        event.preventDefault();
        window.location.href = "register";
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.user !== '' && this.state.pass !== '') {
            document.getElementById('email').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('guestID').value = '';
            window.location.href = "planner";
        } else {
            document.getElementById('plannerError').style.color = 'red';
        }
    }

    render () {

        return (
            <div className= 'box' id= 'plannerLogin'>
                <h2>Login as Planner</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='infoBox'>
                        <input type='text' className='textBox' id='email'
                               placeholder='E-mail' onChange={ this.changeUser} />
                        <input type='password' className='textBox' id='pass'
                               placeholder='Password' onChange={this.changePass} />
                        <div className='loginError' id='plannerError'>
                            Invalid Username/Password
                        </div>
                    </div>
                    <div id='newRegister' onClick={this.handleRegister}>
                        New User? Click Here to Register
                    </div>
                    <input type='submit' className='button' id='planner' value='LOGIN' />
                </form>
            </div>
        );

    }
}

export default function Login() {
    return <LoginBox />
}