const connection = require('./config');
const bodyParser = require('body-parser');
const authenticateController = require('./controllers/authenticate-controller');
const registerController = require('./controllers/register-controller');
const guestController = require('./controllers/guest-controller');
const getGuestListController = require('./controllers/get-guestList-controller');
const eventController = require('./controllers/event-controller');
const getEventListController = require('./controllers/get-eventList-controller');
const groupController = require('./controllers/group-controller');

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
router.post('/api/add-guest', guestController.addGuest);
router.post('/api/delete-guest', guestController.deleteGuest);
router.post('/api/update-guest', guestController.updateGuest);
router.post('/api/get-guest-list', getGuestListController.getGuestList);
router.post('/api/add-event', eventController.addEvent);
router.post('/api/get-event', eventController.getEvent);
router.get('/api/get-event-list', getEventListController.getEventList);
router.post('/api/get-guest-group', groupController.getGuestGroup);

const PORT = 5000;

// serv environment
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
