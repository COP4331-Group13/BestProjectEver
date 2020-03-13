import ls from 'local-storage';
import {Guest, User} from "./User";
import {addEvent, addGuest, deleteGuest, updateGuest, getEventList, getGuestList, getSingleEvent, getGuestGroup} from "./Validator";

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
        if (ls('curGuest') === null)
            ls('curGuest', undefined);
        if (ls('curEvent') == null)
            ls('curEvent', undefined);
        if (ls('curGroup') == null)
            ls('curGroup', undefined);
        if (ls('signed') === null)
            ls('signed', false);
    }

    setUser(newUser) {
        if (newUser instanceof User) {
            ls('curUser', newUser);
            ls('signed', true);
            return true;
        } else if (newUser instanceof Guest) {
             ls('curUser', newUser);
             ls('signed', true);
             return true;
        } else {
            return false;
        }
    }
    getUser() {
        return ls('curUser');
    }
    addGuest(state) {
        if (ls('curEvent') !== undefined) {
            let guests = ls('guestList');
            let added = addGuest(state, ls('curEvent').pin);
            if (added[0]) {
                guests.push(added[1]);
                ls('guestList', guests);
                return added;
            } else {
                return added;
            }
        }
        return [false];
    }
    setGuest(newGuest) {
      ls('curGuest', newGuest)
    }
    deleteGuest() {
      if (ls('curGuest') !== undefined) {
        let guests = ls('guestList');
        let deleted = deleteGuest(ls('curGuest').guestId);
        if (deleted[0]) {
          let filtered = guests.filter(function(value, index, arr) {
            return value.guestId !== ls('curGuest').guestId;
          });
          ls('guestList', filtered);
          return true;
        }
      }
      return false;
    }
    updateGuest(state) {
      if (ls('curGuest') !== undefined) {
        let guests = ls('guestList');
        let updated = updateGuest(state, ls('curGuest').guestId);
        if (updated[0]) {
          for (let i in guests) {
            if (guests[i].guestId === ls('curGuest').guestId) {
              guests[i].userName = state.email;
              guests[i].name = state.name;
              guests[i].phoneNumber = state.phone;
              guests[i].address = state.address;
              break; // found it
            }
          }
          ls('guestList', guests);
          return true;
        }
      }
      return false;
    }
    getGuest() {
      return ls('curGuest');
    }
    getGuests() {
      if (ls('guestList').length !== 0) {
          return [true, ls('guestList')];
      } else {
           if (ls('curEvent') !== undefined) {
              let added = getGuestList(ls('curEvent').pin);
              if (added[0]) {
                  ls('guestList', added[1]);
              }
              return added
          }
          return [false, "No Current Event"];
      }
    }
    resetGuest() {
      ls('curGuest', undefined);
    }
    resetGuests() {
      ls('guestList', []);
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
    getSingleEvent() {
        let newEvent = getSingleEvent(ls('curUser').eventPin);
        if (newEvent[0]) {
          ls('curEvent', newEvent[1]);
        }
    }
    getEvent() {
        return ls('curEvent');
    }
    getEvents() {

        if (ls('eventList').length !== 0) {
            return [true, ls('eventList')];
        } else {
            if (ls('curUser') !== undefined) {

                let added = getEventList(ls('curUser'));
                if (added[0]) {
                    ls('eventList', added[1]);
                }
                return added
            }

            return [false, "No Current User"];
        }
    }
    getGuestGroup() {
      if (ls('curUser') !== undefined) {
        let group = getGuestGroup(ls('curUser').guestId);
        if (group[0]) {
          ls('curGroup', group[1]);
          return [true, group[1]];
        } else {
            return [false, "No Group"]
        }
      } else {
          return [false, "No Current User"];
      }
    }
    clear() {
        ls('curUser', undefined);
        ls('curGuest', undefined);
        ls('curEvent', undefined);
        ls('curGroup', undefined);
        ls('guestList', []);
        ls('itemList', []);
        ls('eventList', []);
        ls('signed', false);
    }

    isSigned() {
        return ls('signed');
    }
}
