import {User} from "./User";

export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

export function validatePlanner(state, storage) {
    if (state.user !== "" && state.pass !== "") {
        let newUser = new User(state.user);
        storage.setUser(newUser);
        return true;
    } else {
        return false;
    }
}

export function registerPlanner(state, storage) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (state.pass !== state.repass) {
      return [false, 'Passwords do not match']
    } else if (!state.user.match(emailFormat)) {
        return [false, `${state.user} is not a valid email address`]
    } else if (!state.pass.match(passFormat)){
        return [false, 'Passwords must be at least 8 characters long; contain at least 1 lower case letter [a-z]; at least 1 upper case letter [A-Z]; at least 1 number [0-9]']
    } else if (state.name !== "" && state.user !== "" && state.pass !== "" && state.repass !== ""){
        let newUser = new User(state.user);
        storage.setUser(newUser);
        return [true];
    } else {
        return [false, 'Please fill in all fields']
    }
}
