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
    if (state.pass !== state.repass) {
      return [false, 'Passwords do not Match']
    } else if (state.name !== "" && state.user !== "" && state.pass !== "" && state.repass !== ""){
        let newUser = new User(state.user);
        storage.setUser(newUser);
        return [true];
    } else {
        return [false, 'Please fill in all fields']
    }
}
