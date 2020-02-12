'use strict';

const e = React.createElement;

class LoginBox extends React.Component {

  render() {

    return (
      e (
        'div',{className:'login'},
        e (PlannerLogin),
        e (GuestLogin)

      )
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
    if (this.state.gID != '') {
      document.getElementById('email').value = '';
      document.getElementById('pass').value = '';
      document.getElementById('guestID').value = '';
      window.location.href = "guest.html";
    } else {
      document.getElementById('guestError').style.color = 'red';
    }
  }

  render () {

    return (e (
        'div',
        {className: 'box', id: 'guestLogin'},
        e (
          'h2',
          null,
          'Login as Guest'),
        e (
          'form',
          {onSubmit: this.handleSubmit},
          e (
            'div',
            {className:'infoBox'},
            e (
              'input',
              {type:'text', className:'textBox',id:'guestID', placeholder:'Unique Guest ID', onChange: this.changeGID},
              null),
            e (
              'div',
              {className:'loginError', id:'guestError'},
              "Invalid Guest ID")
            ),
          e (
            'input',
            {type:'submit', className:'button', id:'guest', value:'CONTINUE'},
            null)
        )
      )
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
    window.location.href = "registerUser.html";
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.user != '' && this.state.pass != '') {
      document.getElementById('email').value = '';
      document.getElementById('pass').value = '';
      document.getElementById('guestID').value = '';
      window.location.href = "event_planner.html";
    } else {
      document.getElementById('plannerError').style.color = 'red';
    }
  }

  render () {

    return (e (
        'div',
        {className: 'box', id: 'plannerLogin'},
        e (
          'h2',
          null,
          'Login as Planner'),
        e (
          'form',
          {onSubmit: this.handleSubmit},
          e (
            'div',
            {className:'infoBox'},
            e (
              'input',
              {type:'text', className:'textBox', id:'email', placeholder:'E-mail', onChange: this.changeUser},
              null),
            e (
              'input',
              {type:'password', className:'textBox', id:'pass', placeholder:'Password', onChange: this.changePass},
              null),
            e (
              'div',
              {className:'loginError', id:'plannerError'},
              "Invalid Username/Password")            
            ),
          e (
              'div',
              {id:'newRegister', onClick: this.handleRegister},
               'New User? Click Here to Register'),
          e (
            'input',
            {type:'submit', className:'button', id:'planner', value:'LOGIN'},
            null)
        )
      )
    );

  }
}



const domContainer = document.querySelector('#loginbox');
ReactDOM.render(e(LoginBox), domContainer);
