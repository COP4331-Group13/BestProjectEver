import React from "react";
import { Switch } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Planner from '../pages/Planner';
import Guest from '../pages/Guest';
import Route from './Route';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} history = {Routes.history}/>
            <Route path="/register" component={Register} />
            <Route path="/planner" component={Planner} />
            <Route path="/guest" component={Guest} />
            {/* redirect user to Login page if route does not exist and user is not authenticated */}
            <Route component={Login} />
        </Switch>
    );
}