const connection = require('./../config');
const express = require('express');

module.exports.getEventList = function(req,res) {

	connection.query('SELECT * FROM planner WHERE email = ?',[req.body.planner], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				let planner_id = results[0].planner_id;

				connection.query('SELECT event_pin, event_name, event_time, address, max_people, layout_length, layout_width FROM event WHERE planner_id = ?',[planner_id], function (error, results, rows) {
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
	});
};
