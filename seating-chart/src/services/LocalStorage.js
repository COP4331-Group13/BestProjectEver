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

    clear() {
        this.curUser = undefined;
        ls('curUser', this.curUser);
        this.curEvent = undefined;
        ls('curEvent', this.curEvent);
        this.guestList = [];
        ls('guestList', this.guestList);
        this.itemList = [];
        ls('itemList', this.itemList);
        this.eventList = [];
        ls('eventList', this.eventList);

    }

    hasUser() {
        return this.curUser !== undefined;
    }
}
