import ls from 'local-storage';
import {Guest, User} from "./User";
import {addEvent} from "./Validator";

export class LocalStorage {
    constructor() {
        if (ls('guestList') === null)
            ls('guestList', []);
        if (ls('itemList') === null)
            ls('itemList', []);
        if (ls('eventList') === null)
            ls('eventList', []);
        if (ls('curUser') === null)
            ls('curUser', undefined);
        if (ls('curEvent') == null)
            ls('curEvent', undefined);
        if (ls('signed') === null)
            ls('signed', false);
    }

    setUser(newUser) {
        if (newUser instanceof User) {
            ls('curUser', newUser);
            ls('signed', true);
            return true;
        } else {
            return false;
        }
    }
    getUser() {
        return ls('curUser').userName;
    }
    addGuest() {

    }
    addEvent(state) {
        let eventList = ls('eventList');
        let added = addEvent(state, this.getUser());
        if (added[0]) {
            eventList.push(added[1]);
            ls('eventList', eventList);
        }
        return added;
    }
    setEvent(newEvent) {
        ls('curEvent', newEvent);
    }
    getEvent() {
        return ls('curEvent');
    }
    getEvents() {
        return ls('eventList');
    }

    clear() {
        ls('curUser', undefined);
        ls('curEvent', undefined);
        ls('guestList', []);
        ls('itemList', []);
        ls('eventList', []);
        ls('signed', false);
    }

    isSigned() {
        return ls('signed');
    }
}
