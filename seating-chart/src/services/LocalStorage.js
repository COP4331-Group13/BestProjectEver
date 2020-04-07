import ls from 'local-storage';
import {Guest, User} from "./User";
import React from "react";
import {ChartItem, Table} from "./ChartItems"
import {
    addEvent,
    addGuest,
    deleteGuest,
    updateGuest,
    deleteEvent,
    getEventList,
    getGuestList,
    getSingleEvent,
    getGuestGroup,
    getItemList
} from "./Validator";

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
    updateGuestUser(state) {
      if (ls('curUser') !== undefined) {
        let updated = updateGuest(state, ls('curUser').guestId);
        if (updated[0]) {
          let newUser = new Guest(state.email, state.name, state.address, state.phone, ls('curUser').guestId, ls('curUser').eventPin);
          ls('curUser', newUser);
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
        let added = addEvent(state, this.getUser().userName);
        if (added[0]) {
            eventList.push(added[1]);
            ls('eventList', eventList);
        }
        return added;
    }
    deleteEvent() {
      if (ls('curEvent') !== undefined) {
        let events = ls('eventList');
        let deleted = deleteEvent(ls('curEvent').pin);
        if (deleted[0]) {
          let filtered = events.filter(function(value, index, arr) {
            return value.pin !== ls('curEvent').pin;
          });
          ls('eventList', filtered);
          return true;
        }
      }
      return false;
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
    addItem(state) {

    }
    addTable(state) {
        let items = ls('itemList');
        let tableHeight = parseInt(state.height)*10;
        let tableWidth = parseInt(state.width)*10;
        let curEvent = ls('curEvent');

        if (tableHeight >= curEvent.layout_length
            || tableWidth >= curEvent.layout_width) {
            return [false, "Table too large to fit in Layout"];
        } else if (tableWidth < 50 || tableHeight < 50) {
            return [false, "Table must be at least 5ft. by 5ft."];
        }
        let table = new Table({name: "Table" + (items.length + 1),
            xCoordinate: 0, yCoordinate: 0, height:tableHeight, width:tableWidth,
            seats:state.numSeats, guests: [], availableSeats:state.numSeats});
        items.push(table);
        ls('itemList', items);
        return [true];
    }
    getItems() {
        if(ls('itemList').length !== 0) {
            return [true, ls('itemList')];
        } else {
            if (ls('curUser') !== undefined) {

                let gotItems = getItemList(ls('curUser'));
                if (gotItems[0]) {
                    ls('itemList', gotItems[1]);
                }
                return gotItems
            }
            return [false, "No Current User"];
        }
    }
    resetItems() {
        ls("itemList", []);
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
