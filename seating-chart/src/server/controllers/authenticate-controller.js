var connection = require('./../config');
var express = require('express');
var bcrypt = require('bcrypt');

module.exports.authenticate = function(req,res) {
  var email= req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM planner WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.status(400); // error occured
    res.send();
  } else {
    if(results.length > 0) {
      if(bcrypt.compareSync(password, results[0].password)) {
        res.status(200); // login successful
        res.send({results:results[0].full_name});
      } else {
          res.status(204); // wrong password
          res.send();
      }
    } else {
        res.status(205); // email doesnt exist
        res.send();
    	}
  	}
  });
}

module.exports.authenticateGuest = function(req,res) {

  connection.query('SELECT * FROM guest WHERE guest_pin = ?',[req.body.guest_pin], function (error, results, fields) {
    if (error) {
      res.status(400); // error occured
      res.send(error);
    } else {
      if(results.length > 0) {
        res.status(200); // login successful
        res.send({results: results});
      } else {
         res.status(205); // pin doesnt exist
         res.send();
      }
    }
  });
}
