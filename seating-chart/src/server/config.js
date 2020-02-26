const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sp_admin',
  password : 'MdbGroup13Admin!',
  database : 'seatplanner'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
      console.log("Error while connecting with database");
    }
});

module.exports = connection;
