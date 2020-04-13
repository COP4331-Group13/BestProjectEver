var connection = require('./../config');
var express = require('express');
var bcrypt = require('bcrypt');

module.exports.register = function(req,res) {
	let hash = bcrypt.hashSync(req.body.password, 10);

  var today = new Date();
  var users = {
    "full_name": req.body.full_name,
    "email": req.body.email,
    "password": hash,
    "date_added": today
  }

  connection.query('INSERT INTO planner SET ?',users, function (error, results, fields) {
  if (error) {
		res.status(400);
    res.send(error);
  } else {
			res.status(200);
	    res.send();
  	}
  });
}
