const connection = require('./../config');
const express = require('express');

module.exports.getGuestGroup = function(req,res) {

	connection.query('SELECT * FROM guest WHERE guest_pin = ?',[req.body.guest_pin], function (error, results) {
		if (error) {
			res.status(400);
	    res.send();
	  } else {
				var group_id = results[0].group_id;
				connection.query('SELECT * FROM groups WHERE group_id = ?', [group_id], function (error, results) {
					if (error) {
						res.status(400);
						res.send();
					} else {
							 var group_name = results[0].name;
							 res.status(200);
							 res.send({
								 group_name: group_name
							 });
					}
				})
		}
	});
}
