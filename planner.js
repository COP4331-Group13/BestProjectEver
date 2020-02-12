const e = React.createElement;
const renderButton = function(id, location, name) {
	return (
		e (
			Button,
			{toId: id, toWhere: location, toName: name},
			null
		)
	);
}

class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clicked: 'false'};

		this.handleCLick = this.handleCLick.bind(this);
	}

	handleClick(event) {
		
	}

	render() {
		return (
			e (
				'input',
				{type:'submit', className:'button', id:'add_guest', value'Add Guest'},
				null)
		);
	}
}

const domContainer = document.querySelector(#buttonbox);
ReactDOM.render(e(CreateGuest), domContainer);
