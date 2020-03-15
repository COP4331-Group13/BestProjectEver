import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup} from '@testing-library/react';
import '../services/LocalStorage';
import App from '../App';
import {fireEvent} from "@testing-library/dom';

afterEach(cleanup);

// test correct guest code

// test incorrect guest code (wrong number of characters, code not in db, etc)

// test blank guest code
