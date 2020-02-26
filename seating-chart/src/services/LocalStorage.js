import ls from 'local-storage';
import {Guest, User} from "./User";

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
    addEvent(newEvent) {
        let eventList = ls('eventList');
        eventList.push(newEvent);
        ls('eventList', eventList);

    }
    setEvent(newEvent) {
        ls('curEvent', newEvent);
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
