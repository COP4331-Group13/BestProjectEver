export function validateGuest(gID) {
    return gID !== "" && gID.length === 10;
}

export function validatePlanner(user, pass) {
    return user !== "" && pass !== "";
}
