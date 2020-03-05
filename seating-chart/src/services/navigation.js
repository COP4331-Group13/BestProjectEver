import React from 'react';

export class Navigation extends React.Component{
	constructor(props){
		super(props);
		this.handleEventPage = this.handleEventPage.bind(this);
	}

	handleEventPage(event){
		event.preventDefault();
		this.props.history.push(this.props.towhere);
	}

    render(){
        return(
          <div className='button' id="navigation" onClick={this.handleEventPage}>
              {this.props.text}
          </div>
        );
    }

}
