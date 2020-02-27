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
        res.send({
          "full_name": results[0].full_name,
          "email": results[0].email
        });
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
