'use strict';

const e = React.createElement;
const renderButton = function(id, location, name) {
	return (
		e (
			Button,
			{toID: id, toWhere: location, toName: name},
			null
		)
	);
}


