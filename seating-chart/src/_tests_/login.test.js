import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import {LoginBox, PlannerLogin, GuestLogin} from "../pages/Login";
import shallow from "enzyme/shallow";

afterEach(cleanup);

test('renders LoginScreen without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginBox />, div);
});

test('renders PlannerLogin without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlannerLogin />, div);
});

test('cannot move to Planner screen on null input',() => {
    const wrapper = shallow(<PlannerLogin />);
    global.window = { location: { pathname: '/' } };
    const loginButton = wrapper.find('input').at(2);
    loginButton.simulate('click');
    expect(global.window.location.pathname).toEqual('/');

});

test('renders GuestLogin without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GuestLogin />, div);
});