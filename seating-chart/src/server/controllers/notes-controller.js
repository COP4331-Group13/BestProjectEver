const connection = require('./../config');
const express = require('express');

module.exports.saveNotes = function(req,res) {
	connection.query('UPDATE guest SET notes = ? WHERE guest_pin = ? LIMIT 1', [req.body.value, req.body.guest_pin], function (error, results) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
				res.status(200);
				res.send();
		}
	});
}

module.exports.getNotes = function(req,res) {
		connection.query('SELECT notes FROM guest WHERE guest_pin = ?', [req.body.guest_pin], function (error, results){
			if (error) {
				res.status(400);
				res.send(error);
			} else {
						if (results[0].notes !== NULL) {
							res.status(200);
							res.send({
								notes: results[0].notes
							})
						} else {
								res.status(205);
								res.send();
						}
			}
	});
}
