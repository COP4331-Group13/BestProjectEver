export class User {

    constructor(userName, name) {
        this.userName = userName;
        this.name = name;
    }
}

export class Guest extends User {
    constructor(username, name, address, phoneNumber, guestId, eventPin) {
        super(username);
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.guestId = guestId;
        this.eventPin = eventPin;
    }

}
