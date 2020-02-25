import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage'
import App from "../App";
import {fireEvent} from "@testing-library/dom";

afterEach(cleanup);

test('Application renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

test('App starts on Login Screen',() => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    global.window = { location: { pathname: '' } };
    expect(global.window.location.pathname).toEqual('/');

});

test('App Has Planner Login at startup',() => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    global.window = { location: { pathname: '' } };
    expect(global.window.location.pathname).toEqual('/');
    expect(div.getElementsByClassName('plannerLogin')[0]).toBeInTheDocument;

});

test('App Has Guest Login at startup',() => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    global.window = { location: { pathname: '' } };
    expect(global.window.location.pathname).toEqual('/');
    console.log(div.getElementsByClassName('box'));
    expect(div.getElementsByClassName('guestLogin')[0]).toBeInTheDOM;

});

test('cannot move to Planner screen on null input',() => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    global.window = { location: { pathname: '/' } };
    expect(global.window.location.pathname).toEqual('/');
    const plannerLogin = div.getElementsByClassName('box');
    console.log(div.getElementsByClassName('box'));
    const login = plannerLogin.getElementsByClassName('button')[0];
    fireEvent.click(login);
    expect(global.window.location.pathname).toEqual('/');

});