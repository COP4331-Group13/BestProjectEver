import React from "react";

export class ChartItem  {
    constructor(props) {
        this.name = props.name;
        this.xCoordinate= parseInt(props.xCoordinate);
        this.yCoordinate= parseInt(props.yCoordinate);
        this.height= parseInt(props.height);
        this.width= parseInt(props.width);

        this.changeLocation = this.changeLocation.bind(this);
        this.chooseItem = this.chooseItem.bind(this);
        this.chooseSize = this.chooseSize.bind(this);
    }

    changeLocation(xCoordinate, yCoordinate) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    chooseItem() {
    }

    chooseSize() {
    }
}

export class Table extends ChartItem {
    constructor(props) {
        super(props);
        this.seats = parseInt(props.seats);
        this.guests = props.guests;
        this.availableSeats = parseInt(props.availableSeats);
        this.tableId = props.tableId;
        this.seatGuest = this.seatGuest.bind(this);
    }

    seatGuest() {
        this.setState({availableSeats: this.state.availableSeats - 1});
    }
}
