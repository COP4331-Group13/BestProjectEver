import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {LocalStorage} from "../services/LocalStorage";

export default function RouteWrapper({
    isPrivate,
    storage,
    ...rest
    }) {

    /**
     * Redirect user to SignIn page if he tries to access a private route
     * without authentication.
     */
    if (isPrivate && !storage.isSigned()) {
        return <Redirect to="/" />;
    }

    /**
     * If not included on both previous cases, redirect user to the desired route.
     */
    return <Route {...rest} />;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    storage: PropTypes.instanceOf(LocalStorage).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
};