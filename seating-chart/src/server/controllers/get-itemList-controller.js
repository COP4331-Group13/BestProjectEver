const connection = require('./../config');
const express = require('express');

module.exports.getItemList = function(req,res) {

	connection.query('SELECT table_id, full_name, guest_pin FROM guest WHERE event_pin = ?',[req.body.event_pin], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				var guest = results;
				connection.query('SELECT name, xCoordinate, yCoordinate, height, width, seats, available_seats, table_id FROM chart_items WHERE event_pin = ?',[req.body.event_pin], function (error, results, rows) {
					if (error) {
						res.status(400);
				    res.send();
				  } else {
							res.status(200);
							res.send({
								results: results,
								guests: guest
							});
					}
				});
		}
	});
};
