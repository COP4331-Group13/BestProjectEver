import {User} from "./User";

function callAuthenticate(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/login", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("email="+state.user+"&password="+state.pass);
  var code = xhr.status;
  return code;
}

function callRegister(state) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/register", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.user+"&password="+state.pass);
  var code = xhr.status;
  return code;
}

function callEvent(state, curUser) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-event", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("planner="+curUser+"&event_name="+state.name+"&event_time="+state.time+"&address="+state.address+"&max_people"+state.max_people);
  var code = xhr.status;
  return code;
}

function callGuest(state, curEventPin) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://35.243.169.229:5000/api/add-guest", false);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("full_name="+state.name+"&email="+state.email+"&address="+state.address+"&phone_number="+state.phone_number+"&event_pin="+state.event_pin);
  var code = xhr.status;
  return code;
}

export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

export function validatePlanner(state, storage) {
    if (state.user !== "" && state.pass !== "") {
        var authCode = callAuthenticate(state);
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
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    var passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (state.pass !== state.repass) {
      return [false, 'Passwords do not match']
    } else if (!state.user.match(emailFormat)) {
        return [false, `${state.user} is not a valid email address`]
    } else if (!state.pass.match(passFormat)){
        return [false, 'Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]']
    } else if (state.name !== "" && state.user !== "" && state.pass !== "" && state.repass !== ""){
        var authCode = callAuthenticate(state);
        if (authCode === 200 || authCode === 204) { // email with password already exists
          return [false, `An account already exists for ${state.user}`]
        } else if (authCode === 205) { // email does not exist
            var registerCode = callRegister(state);
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

export function addEvent(state, storage) {
  // need from state: state.name, state.time, state.address, state.max_people
  var curUser; // = get user from storage;
  var addEventCode = callEvent(state, curUser);
  if (addEventCode === 200) { // event added successfully
    // do stuff to add to storage
    return [true];
  } else {
    return [false, 'Error has occured'];
  }
}

export function addGuest(state, storage) {
  // need from state: state.name, state.email, state.address, state.phone_number
  var curEventPin; // = get event_pin from storage;
  var addGuestCode = callGuest(state, curEventPin);
  if (addGuestCode === 200) { // event added successfully
    // do stuff to add to storage
    return [true];
  } else {
    return [false, 'Error has occured'];
  }
}
