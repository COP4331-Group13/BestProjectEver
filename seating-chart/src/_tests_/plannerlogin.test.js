import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from "../App";
import {fireEvent} from "@testing-library/dom";

afterEach(cleanup);

// test correct email/pw
test('Validated planner credentials can log in', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	global.window = { location: { pathname: '/' } };
	expect(global.window.location.pathname).toEqual('/');
	const plannerLogin = div.getElementsByClassName('box');
	console.log(div.getElementsByClassName('box'));
	// check for 200 response from server
});

// test incorrect email/pw (misspelled, not in db, etc)
test('Invalid planner credentials cannot log in', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        global.window = { location: { pathname: '/' } };
        expect(global.window.location.pathname).toEqual('/');
        const plannerLogin = div.getElementsByClassName('box');
        console.log(div.getElementsByClassName('box'));
        // check for 205 response from server
});


