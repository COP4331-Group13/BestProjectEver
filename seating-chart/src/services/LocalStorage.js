import ls from 'local-storage';
import {Guest, User} from "./User";

export class LocalStorage {
    constructor() {
        const guestList = [];
        ls('guestList', guestList);
        const itemList = [];
        ls('itemList', itemList);
        const eventList = [];
        ls('eventList', eventList);
        let curUser;
        let curEvent;

    }

    setUser(newUser) {
        if (newUser instanceof User) {
            this.curUser = newUser;
            ls('curUser', this.curUser);
            return true;
        } else {
            return false;
        }
    }
    addGuest() {

    }
}
