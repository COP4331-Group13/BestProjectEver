import React from 'react';
import '../../SeatPlanner.css';
import {withRouter} from "react-router-dom";
import {validatePlanner, validateGuest} from "../../services/Validator";


export class LoginBox extends React.Component {
    render() {

        return (
            <div id = "wrapperbox">
                <div id = "welcome">
                    <h1>Welcome to Best Fit Seating</h1>
                    <h1>Are you here as an Event Planner or as a Guest?</h1>
                </div>
                <div id = "loginbox">
                    <PlannerLogin history = {this.props.history} storage = {this.props.storage}/>
                    <GuestLogin history = {this.props.history} storage = {this.props.storage}/>
                </div>
            </div>
        );

    }
}

export class GuestLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {gID: '', error: "guestError"};

        this.changeGID = this.changeGID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeGID(event) {
        if (event.target.value.length > 10) {
            this.setState({gID: event.target.value.substr(0,10)});
        } else {
            this.setState({gID: event.target.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateGuest(this.state.gID)) {
            this.props.history.push('/guest');
        } else {
            this.setState({error: 'loginError'});
        }
    }

    render () {

        return (
            <div className='box' id= 'guestLogin'>
                <h2>Login as Guest</h2>
                <form onSubmit= {this.handleSubmit}>
                    <div className='infoBox'>
                        <input type= 'text' className='textBox' id='guestID'
                               placeholder='Unique Guest ID' value={this.state.gID} onChange={this.changeGID} />
                        <div className='loginError' id={this.state.error}>
                            Invalid Guest ID
                        </div>
                    </div>
                    <input type='submit' className='button' id='guest' value='CONTINUE' />
                </form>
            </div>
        );

    }
}

export class PlannerLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user:'', pass:'', error:'plannerError'};

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
        this.props.history.push('/register');
    }

    handleSubmit(event) {
        event.preventDefault();
        let validated = validatePlanner(this.state, this.props.storage);
        if (validated[0]) {
    			this.props.history.push('/events');
    		} else {
            this.setState({error: 'loginError'});
            this.setState({errorMessage: validated[1]});
        }
    }

    render () {

        return (
            <div className= 'box' id= 'plannerLogin'>
                <h2>Login as Planner</h2>
                <form data-testid="plannerLoginForm" onSubmit={this.handleSubmit}>
                    <div className='infoBox'>
                        <input data-testid={this.state.user} type='text' className='textBox' id='email' required
                               placeholder='E-mail' value={this.state.user} onChange={ this.changeUser} />
                        <input data-testid={this.state.pass} type='password' className='textBox' id='pass' required
                               placeholder='Password' value ={this.state.pass} onChange={this.changePass} />
                        <div className='loginError' id={this.state.error}>
                            {this.state.errorMessage}
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

export default withRouter(LoginBox);
