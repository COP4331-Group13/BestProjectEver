const connection = require('./../config');
const express = require('express');

module.exports.getGuestList = function(req,res) {

	connection.query('SELECT * FROM guest WHERE event_pin = ?',[req.body.event_pin], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
			res.status(200);
			res.send({
				length: results.length,
				results: results
			});
		}
	});
}
