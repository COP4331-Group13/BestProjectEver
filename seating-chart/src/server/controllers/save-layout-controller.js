const connection = require('./../config');
const express = require('express');

module.exports.saveLayout = function(req,res) {

		var itemList = {
			"name":req.body.name,
			"xCoordinate":req.body.xCoordinate,
			"yCoordinate":req.body.yCoordinate,
			"height":req.body.height,
			"width":req.body.width,
			"seats":req.body.seats,
			"available_seats":req.body.availableSeats,
			"table_id":req.body.table_id,
			"event_pin":req.body.event_pin
		}
		connection.query('SELECT * FROM chart_items WHERE table_id = ?', [itemList.table_id], function (error, results){
			if (error) {
				res.status(400);
				res.send(error);
			} else {
					if (results.length > 0) {
						connection.query('UPDATE chart_items SET ? WHERE table_id = ? LIMIT 1', [itemList, itemList.table_id], function (error, results) {
							if (error) {
								res.status(400);
								res.send(error);
							} else {
								 res.status(200);
								 res.send();
							}
						});
					} else {
							connection.query('INSERT INTO chart_items SET ?', [itemList], function (error, results) {
								if (error) {
									res.status(400);
									res.send(error);
								} else {
										res.status(200);
										res.send();
								}
						});
				}
		}
	});
}

module.exports.saveGuestLayout = function(req,res) {
		connection.query('UPDATE guest SET table_id = ? WHERE guest_pin = ? LIMIT 1', [req.body.table_id, req.body.guest_pin], function (error, results) {
			if (error) {
				res.status(400);
				res.send(error);
			} else {
					res.status(200);
					res.send();
			}
		});
}
