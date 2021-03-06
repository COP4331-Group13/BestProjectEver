var connection = require('./../config');
var express = require('express');
var randomize = require('randomatic');

module.exports.addGuest = function(req,res) {

	connection.query('SELECT * FROM event WHERE event_pin = ?',[req.body.event_pin], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				var event_id = results[0].event_id;

				connection.query('SELECT * FROM groups WHERE event_id = ?',[event_id], function (error, results) {
					if (error) {
						res.status(400);
						res.send();
					} else {
							if(results.length > 0) {
								var group_id = results[0].group_id;
								var event_pin = req.body.event_pin;
								var guest_pin = req.body.guest_pin;
								var today = new Date();
								var guest = {
									"full_name": req.body.full_name,
									"email": req.body.email,
									"guest_pin": guest_pin,
									"event_pin": event_pin,
									"address": req.body.address,
									"phone_number": req.body.phone_number,
									"group_id": group_id,
									"confirmed": "no",
									"date_added": today
								}

								connection.query('INSERT INTO guest SET ?',guest, function (error, results, fields) {
									if (error) {
										throw(error);
										res.status(400);
										res.send();
									} else {
											res.status(200);
											res.send();
									}
								});
							} else {
								res.status(205); // no group found for event
								res.send();
							}
					}
				});
		}
	});
}

module.exports.deleteGuest = function(req,res) {

	connection.query('SELECT * FROM guest WHERE guest_pin = ?',[req.body.guest_pin], function (error, results) {
		if (error) {
			res.status(400);
			res.send();
		} else {
				if (results.length > 0) {
					var guest_id = results[0].guest_id;
					connection.query('DELETE FROM preferences_guest WHERE guest_id = ?', [guest_id], function (error, results) {
						if (error) {
							res.status(400);
							res.send();
						} else {
								connection.query('DELETE FROM guest WHERE guest_id = ?', [guest_id], function (error, results) {
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
				} else {
					res.status(400)
					res.send();
				}
		}
	});
}

module.exports.updateGuest = function(req,res) {

	let data = [req.body.full_name, req.body.email, req.body.phone_number, req.body.address, req.body.guest_pin];

	connection.query('SELECT * FROM guest WHERE guest_pin = ?',[req.body.guest_pin], function (error, results) {
		if (error) {
			res.status(400);
			res.send();
		} else {
				if (results.length > 0) {
					connection.query('UPDATE guest SET full_name = ?, email = ?, phone_number = ?, address = ? WHERE guest_pin = ?', data, function (error, results) {
						if (error) {
							res.status(400);
							res.send();
						} else {
								res.status(200);
								res.send();
						}
					});
				} else {
					res.status(400)
					res.send();
				}
		}
	});
}
