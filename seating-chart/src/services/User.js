export class User {

    constructor(userName) {
        this.userName = userName;
    }
}

export class Guest extends User {
    constructor(username, name, address, phoneNumber, guestId) {
        super(username);
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.guestId = guestId;
    }

}