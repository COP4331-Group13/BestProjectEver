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
			"event_pin":req.body.event_pin
		}

		connection.query('SELECT * FROM chart_items WHERE name = ? && event_pin = ?', [itemList.name, itemList.event_pin], function (error, results){
			if (error) {
				res.status(400);
				res.send();
			} else {
					if (results.length > 0) {
						connection.query('UPDATE chart_items SET ? WHERE name = ? && event_pin = ? LIMIT 1', [itemList, itemList.name, itemList.event_pin], function (error, results) {
							if (error) {
								res.status(400);
								res.send();
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
										connection.query('SELECT * FROM chart_items WHERE name = ? && event_pin = ?', [itemList.name, itemList.event_pin], function (error, results){
											if (error) {
												res.status(400);
												res.send();
											} else {
													let table_id = results[0].table_id;
													connection.query('UPDATE guest SET table_item = ? WHERE event_pin = ? LIMIT 1', [table_id, itemList.event_pin], function (error, results) {
														if (error) {
															res.status(400);
															res.send();
														} else {
																res.status(200);
																res.send();
														}
													});
											}
										});
								}
							});
					}
			}
		});
}
