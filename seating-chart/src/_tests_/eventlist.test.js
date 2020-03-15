import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from "../App";
import {fireEvent} from "@testing-library/dom";

afterEach(cleanup);

// test if add event creates an event

// test if events are displayed
