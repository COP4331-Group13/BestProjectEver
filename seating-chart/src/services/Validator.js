export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

export function validatePlanner(user, pass) {
    return user !== "" && pass !== "";
}

export function registerPlanner(name, user, pass, repass) {
    if (pass !== repass) {
      return false
    } else {
        return name !== "" && user !== "" && pass !== "" && repass !== "";
      }
}
