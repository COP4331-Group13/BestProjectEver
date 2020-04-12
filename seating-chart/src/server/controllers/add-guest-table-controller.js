var connection = require('./../config');
var express = require('express');
var bcrypt = require('bcrypt');

module.exports.addGuestTable = function(req,res) {

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
