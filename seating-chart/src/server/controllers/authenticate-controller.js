var connection = require('./../config');
var express = require('express');
var bcrypt = require('bcrypt');

module.exports.authenticate = function(req,res) {
  var email= req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM planner WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code": 400,
      "failed":"error ocurred"
    })
  } else {
    if(results.length > 0) {
      if(bcrypt.compareSync(password, results[0].password)) {
        res.send({
          "code": 200,
          "success": "login sucessfull"
        });
      } else {
	        res.send ({
	          "code": 204,
	          "success": "email/password don't exist"
	        });
      }
    } else {
	      res.send({
	        "code": 204,
	        "success": "email doesn't exist"
	      });
    	}
  	}
  });
}
