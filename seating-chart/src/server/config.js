const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : '35.243.169.229',
  user     : 'test',
  password : 'MdbTesting123!',
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
