import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Planner from '../pages/Planner';
import Guest from '../pages/Guest';
import Route from './Route';
import {LocalStorage} from '../services/LocalStorage'

export default function Routes() {
    let storage = new LocalStorage();
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact
                   render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
            />
            <Route path="/register"
                   render = {(props) =><Register{...props} history = {Routes.history} storage = {storage}/>}
            />
            <Route path="/planner"
                   render = {(props) =><Planner{...props} history = {Routes.history} storage = {storage}/>}
            />
            <Route path="/guest"
                   render = {(props) =><Guest{...props} history = {Routes.history} storage = {storage}/>}
            />
            {/* redirect user to Login page if route does not exist and user is not authenticated */}
            <Route
                render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
            />
        </Switch>
       </BrowserRouter>
    );
}
