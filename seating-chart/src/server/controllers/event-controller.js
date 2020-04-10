const connection = require('./../config');
const express = require('express');
const randomize = require("randomatic");

module.exports.addEvent = function(req,res) {

	connection.query('SELECT * FROM planner WHERE email = ?',[req.body.planner], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				let planner_id = results[0].planner_id;


			  let today = new Date();
			  let events = {
			  	"event_pin": req.body.pin,
			    "event_name": req.body.event_name,
			    "event_time": req.body.event_time,
			    "address": req.body.address,
				"max_people": req.body.max_people,
				"planner_id": planner_id,
			    "date_added": today,
				"layout_length": req.body.layout_length,
				"layout_width": req.body.layout_width
			  };

			  connection.query('INSERT INTO event SET ?',events, function (error, results, fields) {
			  if (error) {
					res.status(400);
			    res.send();
			  } else {
						connection.query('SELECT * FROM event WHERE event_pin = ?',[req.body.pin], function (error, results, fields) {
							if (error) {
								res.status(400);
						    res.send();
						  } else {
									let event_id = results[0].event_id;
									let groups = {
										"name": "default",
										"event_id": event_id
									};
									connection.query('INSERT INTO groups SET ?',groups, function (error, results, fields) {
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
	});
};

module.exports.getEvent = function(req,res) {

	connection.query('SELECT * FROM event WHERE event_pin = ?', [req.body.event_pin], function (error, results, fields) {
		if (error) {
			res.status(400);
			res.send();
		} else {
				if (results.length > 0) {
					res.status(200);
					res.send({
						results: results
					})
				} else {
					res.status(205); // no event found
					res.send();
				}
		}
	});
}

module.exports.deleteEvent = function(req,res) {

	connection.query('SELECT * FROM guest WHERE event_pin = ?', [req.body.event_pin], function (error, results, fields) {
		if (error) {
			res.status(400);
			res.send();
		} else {
					for (var i = 0; i < results.length; i++) {
						connection.query('DELETE FROM preferences_guest WHERE guest_id = ?', [results[i].guest_id], function (error, results, fields) {
							if (error) {
								res.status(400);
								res.send();
							}
						});
					}
					connection.query('SELECT * FROM event WHERE event_pin = ?', [req.body.event_pin], function (error, results, fields) {
						if (error) {
							res.status(400);
							res.send();
						} else {
								var event_id = results[0].event_id;
								connection.query('DELETE FROM chart_items WHERE event_pin = ?', [req.body.event_pin], function (error, results) {
									if (error) {
										res.status(400);
										res.send();
									} else {
										connection.query('DELETE FROM guest WHERE event_pin = ?', [req.body.event_pin], function (error, results, fields) {
											if (error) {
												res.status(400);
												res.send();
											} else {
													connection.query('DELETE FROM preferences WHERE event_id = ?', [event_id], function (error, results, fields) {
														if (error) {
															res.status(400);
															res.send();
														} else {
																connection.query('DELETE FROM groups WHERE event_id = ?', [event_id], function (error, results, fields) {
																	if (error) {
																		res.status(400);
																		res.send();
																	} else {
																		connection.query('DELETE FROM event WHERE event_pin = ?', [req.body.event_pin], function (error, results, fields) {
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
										});
									}
								})
						}
					});
		}
	});
}
