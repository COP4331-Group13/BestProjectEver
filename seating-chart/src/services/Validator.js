export function validateGuest(gID) {
    return gID !== "";
}

export function validatePlanner(user, pass) {
    return user !== "" && pass !== "";
}
