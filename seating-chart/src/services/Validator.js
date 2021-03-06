import {User, Guest} from "./User";
import {Event} from "./event";
import {Table} from "./ChartItems";

const randomize = require("randomatic");

function callAuthenticate(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.user+"&password="+state.pass);
  return [xhr.status, xhr.responseText];
}

function callGuestAuthenticate(gID) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/guest-login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+gID);
  return [xhr.status, xhr.responseText];
}

function callRegister(state) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/register", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callGuest(state, curEventPin, guestPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&address="+state.address+"&phone_number="+state.phone+"&event_pin="+curEventPin+"&guest_pin="+guestPin);
  return xhr.status;
}

function callDeleteGuest(guestPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/delete-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+guestPin);
  return xhr.status;
}

function callUpdateGuest(state, guestPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/update-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&phone_number="+state.phone+"&address="+state.address+"&guest_pin="+guestPin);
  return xhr.status;
}

function callGuestList(curEventPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-guest-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+curEventPin);
  return [xhr.status, xhr.responseText];
}

function callEvent(state, curUser, pin, pixelLength, pixelWidth) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser+"&pin="+pin+"&event_name="+state.name+"&event_time="
      +state.date+"&address="+state.address+"&max_people="+state.max+"&layout_length="
      +pixelLength+"&layout_width="+pixelWidth);
  return xhr.status;
}

function callDeleteEvent(eventPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/delete-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+eventPin);
  return [xhr.status, xhr.responseText];
}

function callSingleEvent(eventPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+eventPin);
  return [xhr.status, xhr.responseText];
}

function callEventList(curUser) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-event-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser);
  return [xhr.status, xhr.responseText];
}

function callGuestGroup(guestPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-guest-group", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+guestPin);
  return [xhr.status, xhr.responseText];
}

function callSaveLayout(itemList, event_pin) {
   let xhr = new XMLHttpRequest();
   xhr.open("POST", "http://35.243.169.229:5000/api/save-layout", false);
   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhr.send("name="+itemList.name+"&xCoordinate="+itemList.xCoordinate
       +"&yCoordinate="+itemList.yCoordinate+"&height="+itemList.height+"&width="+itemList.width
       +"&seats="+itemList.seats+"&availableSeats="+itemList.availableSeats
       +"&event_pin="+event_pin+"&table_id="+itemList.tableId);
  return [xhr.status, xhr.responseText];
}

function callSaveGuestLayout(table_id, guest_pin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/save-guest-layout", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("table_id="+table_id+"&guest_pin="+guest_pin);
  return [xhr.status, xhr.responseText];
}

function callItemList(curEventPin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-item-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+curEventPin);
  return [xhr.status, xhr.responseText];
}

function callAddGuestTable(tableId, guest_pin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-guest-table", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("table_id="+tableId+"&guest_pin="+guest_pin);
  return [xhr.status, xhr.responseText];
}

function callSaveNotes(value, guest_pin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/save-notes", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("value="+value+"&guest_pin="+guest_pin);
  return xhr.status;
}

function callGetNotes(guest_pin) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-notes", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+guest_pin);
  return [xhr.status, xhr.responseText];
}

// post calls ^^^^^^^^^^ --> for testing you need to change:
// 35.243.169.229 to localhost in order to get from the test db (all calls)
// remember to change it back when pushing

// functions to ls vvvvvvvvv

export function validatePlanner(state, storage) {
    if (state.user !== "" && state.pass !== "") {
        let authCode = callAuthenticate(state);
        if (authCode[0] !== 200) {
          if (authCode[0] === 204 || authCode[0] === 205) { // email or password are wrong
            return [false, 'Invalid email or password']
          } else { // error sending query 400
            return [false, 'Error has occured']
          }
        }
        let data = JSON.parse(authCode[1]);
        if (authCode[0] === 200) { // account exists
          let newUser = new User(state.user, data.results);
          storage.setUser(newUser);
          return [true];
        }
    } else {
        return [false, 'Please fill in all fields'];
    }
}

export function validateGuest(state, storage) {
    if (state.gID !== "" && state.gID.length === 10) {
        let guestAuthCode = callGuestAuthenticate(state.gID);
        if (guestAuthCode[0] === 200) { // guest account exists
          let data = JSON.parse(guestAuthCode[1]);
          let newGuest = new Guest(data.results[0].email, data.results[0].full_name, data.results[0].address,
            data.results[0].phone_number, data.results[0].guest_pin, data.results[0].event_pin);
          storage.setUser(newGuest);
          return [true];
        } else if (guestAuthCode[0] === 205) { // wrong guest pin
          return [false, 'Invalid Guest ID']
        } else { // error sending query 400
          return [false, 'Error has occured']
        }
    } else {
        return [false, 'Invalid Guest ID'];
    }
}

export function registerPlanner(state, storage) {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    let passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (state.pass !== state.repass) {
      return [false, 'Passwords do not match']
    } else if (!state.user.match(emailFormat)) {
        return [false, `${state.user} is not a valid email address`]
    } else if (!state.pass.match(passFormat)){
        return [false, 'Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]']
    } else if (state.name !== "" && state.user !== "" && state.pass !== "" && state.repass !== ""){
        let authCode = callAuthenticate(state);
        if (authCode[0] === 200 || authCode[0] === 204) { // email with password already exists
          return [false, `An account already exists for ${state.name}`]
        } else if (authCode[0] === 205) { // email does not exist
            let registerCode = callRegister(state);
            if (registerCode === 200) {
              let newUser = new User(state.user, state.name);
              storage.setUser(newUser);
              return [true];
            } else { // error sending query 400
                  return [false, 'Error has occurred']
            }
        } else { // error sending query 400
           return [false, 'Error has occurred']
        }
    } else {
        return [false, 'Please fill in all fields']
    }
}

export function addGuest(state, curEventPin) {
  let guestPin = curEventPin + randomize('Aa0', 5);
  let addGuestCode = callGuest(state, curEventPin, guestPin);
  if (addGuestCode === 200) { // event added successfully
    let newGuest = new Guest(state.email, state.name, state.address, state.phone, guestPin, curEventPin, '');
    return [true, newGuest];
  } else {
    return [false, 'Error has occurred'];
  }
}

export function deleteGuest(guestId) {
  let deleteGuestCode = callDeleteGuest(guestId);
  if (deleteGuestCode === 200) {// guest deleted successfully
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function updateGuest(state, guestId) {
  let updateGuestCode = callUpdateGuest(state, guestId);
  if (updateGuestCode === 200) {// guest deleted successfully
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function getGuestList(curEventPin) {
  let guestListCode = callGuestList(curEventPin);
  if (guestListCode[0] === 200) {
    let data = JSON.parse(guestListCode[1]);
    let guests = [];
    for (let i = 0; i < data.length; i++) {
      guests.push(new Guest(data.results[i].email, data.results[i].full_name, data.results[i].address,
        data.results[i].phone_number, data.results[i].guest_pin, data.results[i].event_pin, data.results[i].table_id, data.results[i].notes));
    }
    return [true, guests];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function addEvent(state, curUser) {
  let pin = randomize('Aa0', 5);
  // Converts width and length from feet into pixels at a rate of 1.5 pixels per foot
  let pixelLength = state.length * 10;
  let pixelWidth = state.width * 10;
  let addEventCode = callEvent(state, curUser, pin, pixelLength, pixelWidth);
  if (addEventCode === 200) { // event added successfully
    let newEvent = new Event(state.name, pin, state.address,
        state.date, state.max, pixelLength, pixelWidth);
    return [true, newEvent];
  } else {
    return [false, 'Error has occurred'];
  }
}

export function deleteEvent(eventPin) {
  let deleteEventCode = callDeleteEvent(eventPin);
  if (deleteEventCode[0] === 200) { // event deleted successfully
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function getSingleEvent(eventPin) {
  let eventCode = callSingleEvent(eventPin);
  if (eventCode[0] === 200) {
    let data = JSON.parse(eventCode[1]);
    let newEvent = new Event(data.results[0].event_name, data.results[0].event_pin,
        data.results[0].address, data.results[0].event_time, data.results[0].max_people,
        data.results[0].layout_length, data.results[0].layout_width);
    return [true, newEvent];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function getEventList(curUser) {
  let eventListCode = callEventList(curUser.userName);
  if (eventListCode[0] === 200) {
    let data = JSON.parse(eventListCode[1]);
    let events = [];
      for (let i = 0; i < data.length; i++) {
          events.push(new Event(
              data.results[i].event_name, data.results[i].event_pin,
              data.results[i].address, data.results[i].event_time,
              data.results[i].max_people, data.results[i].layout_length,
              data.results[i].layout_width));
      }

    return [true, events];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function getGuestGroup(guestPin) {
  let groupCode = callGuestGroup(guestPin);
  if (groupCode[0] === 200) {
    let data = JSON.parse(groupCode[1]);
    let group = data.group_name;
    return [true, group];
  } else {
      return [false];
  }
}

export function getItemList(curEventPin) {
    var itemCode = callItemList(curEventPin);
    if (itemCode[0] === 200) {
      let data = JSON.parse(itemCode[1]);
      let tables = [];
      var guests = [];
      for (var i = 0; i < data.results.length; i++) {
          guests[i] = [];
          for (let j = 0; j < data.guests.length; j++) {
              if (data.guests[j].table_id === data.results[i].table_id) {
                guests[i].push({full_name: data.guests[j].full_name, guest_pin: data.guests[j].guest_pin});
              }
          }
          tables.push(new Table({name:data.results[i].name,
              xCoordinate:data.results[i].xCoordinate, yCoordinate:data.results[i].yCoordinate,
              height:data.results[i].height, width:data.results[i].width,
              seats:data.results[i].seats, guests:guests[i], availableSeats: data.results[i].available_seats,
              tableId:data.results[i].table_id}));
      }
      return [true, tables];
    } else {
        return [false, 'Error has occurred'];
    }
}

export function pushLayout(itemList, event_pin) {
  var pushCode;
  var guestCode;
  for (let i = 0; i < itemList.length; i++) {
    pushCode = callSaveLayout(itemList[i], event_pin);
    for (let j = 0; j < itemList[i].guests.length; j++) {
       guestCode = callSaveGuestLayout(itemList[i].tableId, itemList[i].guests[j].guest_pin);
       if (guestCode[0] !== 200)
        break;
    }
    if (pushCode[0] !== 200)
      break;
  }
  if (pushCode[0] === 200) {
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function addGuestTable(tableId, guest_pin) {
  var addCode;
  addCode = callAddGuestTable(tableId, guest_pin);
  if (addCode[0] === 200) {
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function saveNotes(value, guest_pin) {
  console.log(value, guest_pin)
  var saveCode = callSaveNotes(value, guest_pin);
  if (saveCode === 200) {
    return [true];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function getNotes(guest_pin) {
  var getCode = callGetNotes(guest_pin);
  if (getCode[0] === 200) {
    let data = JSON.parse(getCode[1]);
    return [true, data.notes];
  } else {
      return [false, 'Error has occurred'];
  }
}
