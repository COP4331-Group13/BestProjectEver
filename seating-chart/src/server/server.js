const connection = require('./config');
const bodyParser = require('body-parser');
const authenticateController = require('./controllers/authenticate-controller');
const registerController = require('./controllers/register-controller');
const addEventController = require('./controllers/add-event-controller');
const addGuestController = require('./controllers/add-guest-controller');
const getEventListController = require('./controllers/get-eventList-controller');
const getGuestListController = require('./controllers/get-guestList-controller');

const express = require('express');
const app = express();
const router = express.Router();

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
router.post('/api/guest-login', authenticateController.authenticateGuest);
router.post('/api/add-event', addEventController.addEvent);
router.post('/api/add-guest', addGuestController.addGuest);
router.post('/api/get-event-list', getEventListController.getEventList);
router.post('/api/get-guest-list', getGuestListController.getGuestList);

const PORT = 5000;

// serv environment
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
