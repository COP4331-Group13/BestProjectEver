class CreateGuest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn:true};

		this.handleCLick = this.handleCLick.bind(this);
	}

	handleClick() {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}
}

ReactDOM.render(
	<CreateGuest />,
	document.getElementById('buttonbox')
);
