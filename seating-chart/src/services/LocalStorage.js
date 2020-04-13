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
    getItemList,
    pushLayout,
    addGuestTable,
    saveNotes,
    getNotes
} from "./Validator";

const randomize = require("randomatic");

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
        if (ls('curTable') == null)
            ls('curTable', undefined);
        if (ls('curNotes') == null)
            ls('curNotes', undefined);
        if (ls('signed') === null)
            ls('signed', false);
        this.lastAddedGuest="";
        this.removeGuestTable = this.removeGuestTable.bind(this);
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
                this.lastAddedGuest = added[1];
                ls('guestList', guests.sort(function (guest1, guest2) {
                    return guest1.name.localeCompare(guest2.name);
                }));
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
          ls('guestList', guests.sort(function (guest1, guest2) {
              return guest1.name.localeCompare(guest2.name);
          }));
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
    getGuestList() {
      return ls('guestList');
    }
    getGuests() {
      if (ls('guestList').length !== 0) {
          return [true, ls('guestList')];
      } else {
           if (ls('curEvent') !== undefined) {
              let added = getGuestList(ls('curEvent').pin);
              if (added[0]) {
                  ls('guestList', added[1].sort(function (guest1, guest2) {
                      return guest1.name.localeCompare(guest2.name);
                  }));
              }
              return [added[0], ls('guestList')];
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
        } else if (parseInt(state.numSeats) > (tableHeight/25) + (tableWidth/25)) {
            return [false, "Table not large enough to seat " + state.numSeats + " people."];
        }

        let pin = randomize('Aa0', 5);
        let table = new Table({name: "Table" + (items.length + 1),
            xCoordinate: 0, yCoordinate: 0, height:tableHeight, width:tableWidth,
            seats:state.numSeats, guests: [], availableSeats:state.numSeats, tableId: pin});
        items.push(table);
        ls('itemList', items);
        return [true];
    }
    updateTableLocation(tableId, newX, newY) {
        let itemList = ls('itemList');
        for (let item in itemList) {
            if (itemList[item].tableId === tableId) {
                // we found the table, and we've updated its location
                itemList[item].xCoordinate = newX;
                itemList[item].yCoordinate = newY;
                ls('itemList', itemList);
                break;
            }
        }
    }
    addGuestTable(table, guest_pin) {
        let itemList = ls('itemList');
        let guestList = ls('guestList');
        let guestIndex = -1;
        let curGuest = '';
        for (let item in itemList) {
            if (itemList[item].tableId === table.tableId) {
                for (let i = 0; i < guestList.length; i++) {
                    if (guestList[i].guestId === guest_pin) {
                        curGuest = guestList[i];
                        guestIndex = i;
                        break;
                    }
                }
                if (curGuest === '') {
                    return [false, "No such Guest Found"];
                } else if (curGuest.tableSeated === table.tableId) {
                    return [false, "Guest Already Seated at Current Table"]
                } else if (curGuest.tableSeated !== '') {
                    this.removeGuestTable(curGuest.tableSeated, guest_pin);
                    itemList = ls('itemList');
                }
                itemList[item].guests.push({full_name:curGuest.name, guest_pin:guest_pin});
                guestList[guestIndex].tableSeated = table.tableId;
                itemList[item].availableSeats--;
                ls('itemList', itemList);
                ls('guestList', guestList);
                return [true, itemList[item]];
                //no need to break because return ends the function
            }
        }
    }
    removeGuestTable(tableId, guestId) {
        let tableList = ls('itemList');
        let guestList = ls('guestList');
        for (let i = 0; i < tableList.length; i++) {
            if (tableList[i].tableId === tableId) {
                for (let j = 0; j < tableList[i].guests.length; j++) {
                    if (tableList[i].guests[j].guest_pin === guestId) {
                        tableList[i].guests.splice(j, 1);
                        tableList[i].availableSeats++;
                        break;
                    }
                }
                for (let j = 0; j < guestList.length; j++) {
                    if (guestList[j].guestId === guestId) {
                        guestList[j].tableSeated = '';
                        break;
                    }
                }
                break;
            }
        }
        ls('itemList', tableList);
        ls('guestList', guestList);
    }
    setCurTable(tableId) {
      let itemList = ls('itemList');
      for (let item in itemList) {
          if (itemList[item].tableId === tableId) {
             ls('curTable', itemList[item])
              break;
          }
       }
    }
    getCurTable() {
      return ls('curTable');
    }
    resetCurTable() {
      ls('curTable', undefined);
    }
    getItems() {
        if(ls('itemList').length !== 0) {
            return [true, ls('itemList')];
        } else {
            if (ls('curEvent') !== undefined) {
                let gotItems = getItemList(ls('curEvent').pin);
                if (gotItems[0]) {
                    ls('itemList', gotItems[1]);
                }
                return gotItems;
            }
            return [false, "No Current User"];
        }
    }
    resetItems() {
        ls("itemList", []);
    }
    saveLayout() {
      if(ls('itemList').length !== 0) {
        let save = pushLayout(ls('itemList'), ls('curEvent').pin);
        if (save[0]) {
          return [true];
        }
      } else {
        return [false, "No Items Present On Layout"];
      }
    }
    saveNotes() {
        if (ls('curGuest') !== undefined) {
            let saved = saveNotes(ls('curNotes'), ls('curGuest').guestId);
            if (saved[0]) {
                return [true];
            }
        }
        return [false, "No Current User"];
    }
    setNotes(value) {
      if (ls('curGuest') !== undefined) {
          ls('curNotes', value);
      }
    }
    getNotes(guestId) {
      if (ls('curGuest') !== undefined) {
          let get = getNotes(guestId);
          if (get[0]) {
              return [true, get[1]];
          }
      }
      return [false, "No Current User"];
    }
    resetNotes() {
      ls('curNotes', undefined);
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
