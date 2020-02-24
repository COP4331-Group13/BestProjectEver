import {User} from "./User";

export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

export function validatePlanner(user, pass, storage) {
    if (user !== "" && pass !== "") {
        let newUser = new User(user);
        storage.setUser(newUser);
        return true;
    } else {
        return false;
    }
}

export function registerPlanner(name, user, pass, repass, storage) {
    if (pass !== repass) {
      return false
    } else if (name !== "" && user !== "" && pass !== "" && repass !== ""){
        let newUser = new User(user);
        storage.setUser(newUser);
        return true;
    } else {
        return false
    }
}
