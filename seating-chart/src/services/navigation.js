import React from 'react';
import {withRouter} from "react-router-dom";

export class navigation extends React.component{
		constructor(props){
				this.handleEventPage = this.handleEventPage.bind(this);
		}

		handleEventPage(event){
				event.preventDefault();
				this.props.history.push('/events');
		}
}
