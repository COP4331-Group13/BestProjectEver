import {User, Guest} from "./User";
import {Event} from "./event";

const randomize = require("randomatic");

function callAuthenticate(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callGuestAuthenticate(gID) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/guest-login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+gID);
  return [xhr.status, xhr.responseText];
}

function callRegister(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/register", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callGuest(state, curEventPin, guestPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&address="+state.address+"&phone_number="+state.phone+"&event_pin="+curEventPin+"&guest_pin="+guestPin);
  return xhr.status;
}

function callDeleteGuest(guestPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/delete-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+guestPin);
  return xhr.status;
}

function callUpdateGuest(state, guestPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/update-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&phone_number="+state.phone+"&address="+state.address+"&guest_pin="+guestPin);
  return xhr.status;
}

function callGuestList(curEventPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-guest-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+curEventPin);
  return [xhr.status, xhr.responseText];
}

function callEvent(state, curUser, pin, pixelLength, pixelWidth) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser+"&pin="+pin+"&event_name="+state.name+"&event_time="
      +state.date+"&address="+state.address+"&max_people="+state.max+"&layout_length="
      +pixelLength+"&layout_width="+pixelWidth);
  return xhr.status;
}

function callSingleEvent(eventPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("event_pin="+eventPin);
  return [xhr.status, xhr.responseText];
}

function callEventList(curUser) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-event-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser);
  return [xhr.status, xhr.responseText];
}

function callGuestGroup(guestPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/get-guest-group", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("guest_pin="+guestPin);
  return [xhr.status, xhr.responseText];
}

// post calls ^^^^^^^^^^ --> for testing you need to change:
// 35.243.169.229 to localhost in order to get from the test db (all calls)
// remember to change it back when pushing

// functions to ls vvvvvvvvv

export function validatePlanner(state, storage) {
    if (state.user !== "" && state.pass !== "") {
        let authCode = callAuthenticate(state);
        if (authCode === 200) { // account exists
          let newUser = new User(state.user);
          storage.setUser(newUser);
          return [true];
        } else if (authCode === 204 || authCode === 205) { // email or password are wrong
          return [false, 'Invalid email or password']
        } else { // error sending query 400
          return [false, 'Error has occured']
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
        if (authCode === 200 || authCode === 204) { // email with password already exists
          return [false, `An account already exists for ${state.user}`]
        } else if (authCode === 205) { // email does not exist
            let registerCode = callRegister(state);
            if (registerCode === 200) {
              let newUser = new User(state.user);
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
    let newGuest = new Guest(state.email, state.name, state.address, state.phone, guestPin, curEventPin);
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
        data.results[i].phone_number, data.results[i].guest_pin, data.results[i].event_pin));
    }
    return [true, guests];
  } else {
      return [false, 'Error has occurred'];
  }
}

export function addEvent(state, curUser) {
  let pin = randomize('Aa0', 5);
  // Converts width and length from feet into pixels at a rate of 15 pixels per foot
  let pixelLength = state.length * 15;
  let pixelWidth = state.width * 15;
  let addEventCode = callEvent(state, curUser, pin, pixelLength, pixelWidth);
  if (addEventCode === 200) { // event added successfully
    let newEvent = new Event(state.name, pin, state.address,
        state.date, state.max, state.length, state.width);
    return [true, newEvent];
  } else {
    return [false, 'Error has occurred'];
  }
}

export function getSingleEvent(eventPin) {
  let eventCode = callSingleEvent(eventPin);
  if (eventCode[0] === 200) {
    let data = JSON.parse(eventCode[1]);
    let newEvent = new Event(data.results[0].event_name, data.results[0].event_pin,
        data.results[0].address, data.results[0].event_time, data.results[0].max_people);
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
              data.results[i].max_people, data.results[i].length,
              data.results[i].width));
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
