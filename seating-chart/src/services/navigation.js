import React from 'react';
import {withRouter} from "react-router-dom";

export class navigation{
		constructor(props){
				this.handleEventPage = this.handleEventPage.bind(this);
		}
    render(){
        return(
          <div className='button' id="navigation" onClick={this.handleEventPage}>
              Events
          </div>
        );
    }
		handleEventPage(event){
				event.preventDefault();
				this.props.history.push('/events');
		}
}
