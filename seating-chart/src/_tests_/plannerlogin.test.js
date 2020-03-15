import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from "../App";
import {fireEvent} from "@testing-library/dom";

afterEach(cleanup);

// test correct email/pw

// test incorrect email/pw (misspelled, not in db, etc)

