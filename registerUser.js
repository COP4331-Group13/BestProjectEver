'use strict';

const e = React.createElement;

class RegisterBox extends React.Component {


	render() {

		return (
			e (
        'form',
        {id:'registerBox'},
        e (
          'h1',
          {id:'registerTitle'},
          'Account Information'),
        e (
          'div',
          {id:'inputs'},
          e (
            'input',
            {type:'text', className:'textBox',id:'firstName', placeholder:'First Name'},
            null),
          e (
            'input',
            {type:'text', className:'textBox',id:'lastName', placeholder:'Last Name'},
            null),
          e (
            'input',
            {type:'text', className:'textBox',id:'e-mail', placeholder:'E-mail Address'},
            null),
          e (
            'input',
            {type:'password', className:'textBox',id:'password', placeholder:'Password'},
            null),
          e (
            'input',
            {type:'password', className:'textBox',id:'re_password', placeholder:'Re-Enter Password'},
            null)
        ),
        e (
          'input',
          {type:'submit', className:'button', id:'newUser', value:'Create Account'},
          null)
			)
		);

	}
}



const domContainer = document.querySelector('#wrapperbox');
ReactDOM.render(e(RegisterBox), domContainer);