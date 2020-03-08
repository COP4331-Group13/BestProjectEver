const mysql = require("mysql");

const connection = mysql.createConnection({

  host     : 'localhost',
  user     : 'sp_admin',
  password : 'MdbGroup13Admin!',
  database : 'seatplanner'

/*
// when using on you own host, use these settings, and comment the ones above (which is only for the gcloud localhost)

    host     : '35.243.169.229',
    user     : 'test_user',
    password : 'MdbTesting123!',
    database : 'test'
 */
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
      console.log("Error while connecting with database");
    }
});

module.exports = connection;
