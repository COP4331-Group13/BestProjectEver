const connection = require('./../config');
const express = require('express');

module.exports.getItemList = function(req,res) {

	connection.query('SELECT name, xCoordinate, yCoordinate, height, width, seats, available_seats FROM chart_items WHERE event_pin = ?',[req.body.event_pin], function (error, results) {
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
	/*connection.query('SELECT item_id FROM guest WHERE event_pin = ?',[req.body.event_pin], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				var data = [];
				var length = results.length;
				for (let i = 0; i < length; i++) {
					let item_id = results[i].item_id;
					connection.query('SELECT name, xCoordinate, yCoordinate, height, width, seats, available_seats FROM chart_items WHERE item_id = ?',[item_id], function (error, results, rows) {
						if (error) {
							res.status(400);
					    res.send();
							break;
					  } else {
								res.status(200);
								data[i] = results;
						}
					});
				}
				res.send({
					length: length,
					results: data
				});
		}
	});*/
};
