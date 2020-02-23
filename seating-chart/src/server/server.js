var bodyParser = require('body-parser');
var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');
var connection = require('./config')

var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// dev environment
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
