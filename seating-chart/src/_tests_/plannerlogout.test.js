import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from "../App";
import {fireEvent} from "@testing-library/dom";

afterEach(cleanup);

// when log out button is hit, page should redirect to login page and user has to re-login
