import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from '../App';
import {fireEvent} from '@testing-library/dom';

afterEach(cleanup);

// test correct guest code
test('Validated guest credentials can log in', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        global.window = { location: { pathname: '/' } };
        expect(global.window.location.pathname).toEqual('/');
        const guestLogin = div.getElementsByClassName('box');
        console.log(div.getElementsByClassName('box'));
        // check for 200 response from server
});

// test incorrect guest code (wrong number of characters, code not in db, etc)
test('Invalid guest credentials cannot log in', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        global.window = { location: { pathname: '/' } };
        expect(global.window.location.pathname).toEqual('/');
        const guestLogin = div.getElementsByClassName('box');
        console.log(div.getElementsByClassName('box'));
        // check for 205 response from server
});


// test blank guest code
test('cannot move to Guest screen on null input',() => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    global.window = { location: { pathname: '/' } };
    expect(global.window.location.pathname).toEqual('/');
    const guestLogin = div.getElementsByClassName('box');
    console.log(div.getElementsByClassName('box'));
    const login = guestLogin.getElementsByClassName('button')[0];
    fireEvent.click(login);
    expect(global.window.location.pathname).toEqual('/');

});
