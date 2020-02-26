import React from "react";
import { BrowserRouter, Switch} from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Planner from '../pages/Planner';
import Guest from '../pages/Guest';
import Events from '../pages/Events';
import Route from './Route'
import {LocalStorage} from '../services/LocalStorage'

export default function Routes() {
    let storage = new LocalStorage();
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact
                   render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
                   storage={storage}
            />
            <Route path="/register"
                   render = {(props) =><Register{...props} history = {Routes.history} storage = {storage}/>}
                   storage={storage}
            />
            <Route path = "/events"
                    render = {(props) =><Events{...props} history = {Routes.history} storage = {storage}/>}
                    isPrivate = {true} storage={storage}
            />
            <Route path="/planner"
                   render = {(props) =><Planner{...props} history = {Routes.history} storage = {storage}/>}
                   isPrivate = {true} storage={storage}
            />
            <Route path="/guest"
                   render = {(props) =><Guest{...props} history = {Routes.history} storage = {storage}/>}
                   isPrivate = {true} storage={storage}
            />
            {/* redirect user to Login page if route does not exist and user is not authenticated */}
            <Route
                render = {(props) =><Login{...props} history = {Routes.history} storage = {storage}/>}
                storage={storage}
            />
        </Switch>
       </BrowserRouter>
    );
}
