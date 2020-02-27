var bodyParser = require('body-parser');
var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');
var addEventController = require('./controllers/add-event-controller');
var connection = require('./config');

var express = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', router);
router.post('/api/register', registerController.register);
router.post('/api/login', authenticateController.authenticate);
router.post('/api/add-event', addEventController.addEvent);

const PORT = 5000;

// serv environment
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
