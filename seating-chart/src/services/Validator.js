import {User} from "./User";
import {Event} from "./event";

const randomize = require("randomatic");

function callAuthenticate(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callRegister(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/register", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.user+"&password="+state.pass);
  return xhr.status;
}

function callEvent(state, curUser, pin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser+"&pin="+pin+"&event_name="+state.name+"&event_time="+state.date+"&address="+state.address+"&max_people="+state.max);
  return xhr.status;
}

function callGuest(state, curEventPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&address="+state.address+"&phone_number="+state.phone_number+"&event_pin="+state.event_pin);
  return xhr.status;
}

function callEventList(curUser) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://35.243.169.229:5000/api/get-event-list", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser);
  return [xhr.status, xhr.responseText];
}

export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

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

export function addEvent(state, curUser) {
  let pin = randomize('Aa0', 5);
  let addEventCode = callEvent(state, curUser, pin);
  if (addEventCode === 200) { // event added successfully
    let newEvent = new Event(state.name, pin, state.address, state.date, state.max);
    return [true, newEvent];
  } else {
    return [false, 'Error has occurred'];
  }
}

export function addGuest(state, storage) {
  // need from state: state.name, state.email, state.address, state.phone_number
  let curEventPin; // = get event_pin from storage;
  let addGuestCode = callGuest(state, curEventPin);
  if (addGuestCode === 200) { // event added successfully
    // do stuff to add to storage
    return [true];
  } else {
    return [false, 'Error has occurred'];
  }
}

export function getEventList(curUser) {
  let eventListCode = callEventList(curUser);
  if (eventListCode[0] === 200) {
    var data = JSON.parse(eventListCode[1]);
    // number of results: data.length
    /* format to get data: data.results[i].event_pin);
                           data.results[i].event_name);
                           data.results[i].event_time);
                           data.results[i].address);
                           data.results[i].max_people);
       and put it into eventList
    */
  } else {
     // error occurred
  }
}
